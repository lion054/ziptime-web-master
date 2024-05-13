import React, { useState, useEffect } from "react";
import Cookie from "universal-cookie";
// import Loading from "components/page_components/Loading";
import { getMe } from "../helpers/requestHelper";
import store from '../store';
import Header from './Header';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
const SweetAlert = withReactContent(Swal);

const cookies = new Cookie();
const loginLocation = "/";

const sleep = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));

import { useDispatch } from 'react-redux';
import { saveUser, clearUser } from '../store/appSlice';
import { useHistory } from 'react-router-dom'

export default RouteComponent => {
    return function Auth (props) {
        const [loading, setLoading] = useState(true);
        const [refreshCounter, setRefreshCounter] = useState(0);
        const [user, setUser] = useState();
        const dispatch = useDispatch();
        const history = useHistory();

        useEffect(() => {
            const storeUnsubscribe = store.subscribe(setData);
            setData();
            setLoading(false);

            return () => {
                storeUnsubscribe();
            }
        })

        const setData = async () => {
            let ziptime = cookies.get("ziptime");
            if (!ziptime) {
                if(loginLocation != window.location.pathname){
                    localStorage.setItem('pathname', window.location.pathname + window.location.search);

                    return history.push(loginLocation);
                }
            
                return setLoading(false);
            }

            let { app } = store.getState();
            let newUser = (app || {}).user;
            
            if (!newUser) {
                try { newUser = await getMe();
                }catch(error){ 
                    let errorMsg = (error || {}).response ? (((error.response || {}).data || {}).data || {}).description || (((error || {}).response || {}).data || {}).message : undefined;

                    if (errorMsg == 'No user found') { return handleLogout(); }

                    SweetAlert.fire(undefined,errorMsg,'error');
                    return setLoading(false);
                }
                
                setUser(newUser)
                return dispatch(saveUser(newUser));
            }

            setUser(newUser)

            // newState.company = store.getState("company");
            // if(!newState.company) { newState.company = this.state.currentCompanyId ? { _id: this.state.currentCompanyId } : (user || {}).company; }
            // else { localStorage.setItem('company', newState.company._id); }

            // newState.user = user;
            
            // let menuArrayRead = window.atob(user.settings.menu || '').split(",");
            // let menuArrayWrite = window.atob(user.settings.menuWrite || '').split(",");

            // newState.menuAccessRead = menuArrayRead;
            // newState.menuAccessWrite = menuArrayWrite;

            // newState.currentCompanyId = newState.company._id;
            
            // if(user.locations.length == 0){ return this.props.history.push("/profile"); }
            
            let pathname = localStorage.getItem('pathname');
            if(pathname){
                history.push(pathname);
                localStorage.removeItem('pathname');
            } else if(history.location.pathname == "/"){
                history.push(newUser.access == 30 ? '/places' : '/manager');
            }
        }
        
        

        const handleRefreshPage = () => {
            setRefreshCounter(refreshCounter + 1)
        }

        const handleLogout = async () => {
            cookies.remove("ziptime",{path:"/"});
            dispatch(clearUser());
        }

        if (loading) {return <div />}

        return (
            <div>
                {user &&
                    <div>
                        <Header 
                            user={user} 
                            // companyId={this.state.company._id} 
                            onRefreshPage={handleRefreshPage}
                            onLogout={handleLogout}
                        />
                    </div>
                }
                
                <RouteComponent 
                    user={user} 
                    // companyId={this.state.company._id} 
                    // google={props.google}
                    // refreshCounter={this.state.refreshCounter}
                    // accessWrite={this.state.menuAccessWrite}
                    // accessRead={this.state.menuAccessRead}
                />
                
            </div>
        );
    }
}