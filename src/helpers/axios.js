import Cookie from "universal-cookie";
import axios from "axios";
const cookies = new Cookie();

const domain = (endpoint,baseURL) => `${baseURL || process.env.API_URL}${endpoint}`;

var isRefreshing = false;
var refreshSubscribers = [];
export default (options, version="") => {
    let ziptime = cookies.get("ziptime");
    let headers = { 'x-app-platform':'web' };

    if((options || {}).headers) { headers = options.headers; }

    if((ziptime || {}).token) { headers['x-access-token'] = (ziptime || {}).token; }

    if((options || {}).removeAuth) { delete headers['x-access-token']; }

    let finalUrl = domain(`/api/${version}`, (options || {}).baseURL);
    
    if((options || {}).needsBasic) { 
        headers["Authorization"] = 'Basic MTQ1NTQ2NTAzMjpaR2JhVTI1VnpBOFBtSHBEdW5SY0plMDhCRW5DUWdPdEhVUlJsWDF6';
    }

    const instance = axios.create({
        baseURL: finalUrl,
        timeout: 30000,
        headers
    });

    instance.interceptors.response.use(response => {
        return response;
    }, error => {
        let config, status;
        if (error.config) { config = error.config; }
        if (error.response && error.response.status) { status = error.response.status; }
        // const { config, response: { status } } = error;
        const originalRequest = config;
        if (status === 401) {
            if (!isRefreshing && ziptime != undefined) {
                isRefreshing = true;
                refreshAccessToken().then(newToken => {
                    isRefreshing = false;
                    onRefreshed(newToken);
                }).catch(error => {
                
                    if (window.location.pathname != '/' || window.location.pathname == '/' && window.location.search != '') { 
                        window.location = '/'; 
                    }
                    
                    return Promise.reject(error);
                });
            }
            
            if (ziptime != undefined) {
                const retryOrigReq = new Promise((resolve, reject) => {
                    subscribeTokenRefresh(token => {
                        // replace the expired token and retry
                        originalRequest.headers['x-access-token'] = token;
                        resolve(axios(originalRequest));
                    });
                });

                return retryOrigReq;
            }
        }
        
        return Promise.reject(error);
        
    });

    var subscribeTokenRefresh = (cb) => {
        refreshSubscribers.push(cb);
    }

    var onRefreshed = (token) => {
        refreshSubscribers.map(cb => cb(token));
    }

    function refreshAccessToken() {
        return new Promise((resolve, reject) => {
            const params = new URLSearchParams();
            params.append('grantType', 'refreshToken');
            params.append('refreshToken', ziptime.refreshToken);
            
            axios({
                method: 'post',
                headers: {
                    Authorization: 'Basic MTQ1NTQ2NTAzMjpaR2JhVTI1VnpBOFBtSHBEdW5SY0plMDhCRW5DUWdPdEhVUlJsWDF6',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'x-app-platform':'web'
                },
                url: domain('/authenticate'),
                data: params
            }).then(function(response){
                response.data.user = undefined;
                cookies.set('ziptime',response.data, {path:"/"});
                ziptime = response.data;
                
                resolve(response.data.token);
            }).catch(error => {
                
                cookies.remove("ziptime",{path:"/"});
                
                reject(error);
            });
        })
    }

    return instance;
};
