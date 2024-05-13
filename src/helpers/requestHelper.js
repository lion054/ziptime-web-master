import Axios from './axios.js';
import { CancelToken, isCancel } from 'axios';
import Cookies from "universal-cookie";
import moment from "moment";
const cookies = new Cookies();
import "regenerator-runtime/runtime";
import { useRef, useEffect, useCallback } from 'react';

const signUserIn = async (credentials, cancelToken) => {
	
	let response;
	try { response = await Axios({needsBasic:true}).post('/authenticate', credentials, cancelToken ? { cancelToken } : undefined)
	} catch (e) { throw e; }

	if (((response || {}).data || {}).user == undefined) { throw new Error('Email e/ou senha incorretos'); }


	let user = JSON.parse(JSON.stringify(((response || {}).data || {}).user));
    delete response.data.user;
    delete response.data.message;
    delete response.data.success;
    response.data.createdAt = new Date().toISOString();
    response.data.expiresAt = moment(new Date()).add(response.data.expires_in, "seconds").toDate().toISOString();
    cookies.set("ziptime",response.data,{path:"/"});

    return user;
}

const getMe = async (cancelToken) => {
	let response;
	try { response = await Axios().get('/web/users/me', cancelToken ? { cancelToken } : undefined)
	} catch (e) { throw e; }

	if (((response || {}).data || {}).user == undefined) { throw new Error('Desculpe, ocorreu algum erro.'); }

	let user = JSON.parse(JSON.stringify(((response || {}).data || {}).user));

	return user;
}

const getPlacesList = async (cancelToken, skip=0, limit=15, nameRegex) => {
	let params = `?skip=${skip}&limit=${limit}`;

	if (nameRegex != undefined) { params += `&nameRegex=${nameRegex}` }

	let response;
	try { response = await Axios().get(`/web/places${params}`, cancelToken ? { cancelToken } : undefined)
	} catch (e) { throw e; }

	let { data } = response;
	if (data == undefined) { throw new Error('Desculpe, ocorreu algum erro.'); }

	return data;
}

const getPlaceById = async (cancelToken, placeId) => {
	if (placeId == undefined) { throw new Error('Estabelecimento não tem identificador!'); }

	let response;
	try { response = await Axios().get(`/web/places/${placeId}`, cancelToken ? { cancelToken } : undefined)
	} catch (e) { throw e; }

	let { data } = response;
	if (data == undefined) { throw new Error('Desculpe, ocorreu algum erro.'); }

	return data.place;
}

const getCategories = async (cancelToken, skip, limit=10, regex) => {

	let params = `?limit=${limit}`;
	if (skip != undefined) { params = `${params}&skip=${skip}`; }
	if (regex != undefined) { params = `${params}&nameRegex=${regex}`; }

	let response;
	try { response = await Axios().get(`/web/categories${params || ''}`, cancelToken ? { cancelToken } : undefined)
	} catch (e) { throw e; }

	let { data } = response;
	if (data == undefined) { throw new Error('Desculpe, ocorreu algum erro.'); }

	return data;

}

const createPlace = async (cancelToken, params) => {

	let response;
	try { response = await Axios().post(`/web/places`, params, cancelToken ? { cancelToken } : undefined)
	} catch (e) { throw e; }

	let { data } = response;
	if (data == undefined) { throw new Error('Desculpe, ocorreu algum erro.'); }

	return data.savedPlace;

}

const editPlace = async (cancelToken, placeId, params) => {
	let response;
	try { response = await Axios().put(`/web/places/${placeId}`, params, cancelToken ? { cancelToken } : undefined)
	} catch (e) { throw e; }

	let { data } = response;
	if (data == undefined) { throw new Error('Desculpe, ocorreu algum erro.'); }

	return data;
}

const getSignedRequestForPlaceImage = async (cancelToken, placeId, fileType) => {

	let response;
	try { response = await Axios().get(`/web/places/${placeId}/image?fileType=${fileType}`, cancelToken ? { cancelToken } : undefined)
	} catch (e) { throw e; }

	let { data } = response;
	if (data == undefined) { throw new Error('Desculpe, ocorreu algum erro.'); }

	const signedRequest = data.signed_request;
	const url = data.url;

	return {signedRequest, url};
}

const uploadFile = async (cancelToken, signedRequest, file) => {

	let response;
	try { 
		response = await Axios({removeAuth:true, headers : {'content-type' : file.type}})
		.put(signedRequest, file, cancelToken ? { cancelToken } : undefined);
	} catch (e) { throw e; }

    return response;

}

const getManagers = async (cancelToken, placeId, skip, limit) => {
	let params = `?skip=${skip}&limit=${limit}`;

	let response;
	try { response = await Axios().get(`/web/places/${placeId}/access${params}`, cancelToken ? { cancelToken } : undefined)
	} catch (e) { throw e; }

	let { data } = response;
	if (data == undefined) { throw new Error('Desculpe, ocorreu algum erro.'); }

	return data;
}

const addUserAccess = async (cancelToken, placeId, managerEmail) => {
	const params = { email: managerEmail };

	let response;
	try { response = await Axios().post(`/web/places/${placeId}/access`, params, cancelToken ? { cancelToken } : undefined)
	} catch (e) { 
		let { data } = (e || {}).response;

		throw new Error(data.message || e.message); 
	}

	let { data } = response;
	if (data == undefined) { throw new Error('Desculpe, ocorreu algum erro.'); }

	return data.access;
}

const removeUserAccess = async (cancelToken, placeId, userId) => {

	let response;
	try { response = await Axios().delete(`/web/places/${placeId}/access/${userId}`, cancelToken ? { cancelToken } : undefined)
	} catch (e) { throw e; }

	let { data } = response;
	if (data == undefined) { throw new Error('Desculpe, ocorreu algum erro.'); }

	return data.access;
}

const createManagerUser = async (cancelToken, place, email, password) => {
	const params = { email, password, place };

	let response;
	try { response = await Axios().post(`/web/places/${place}/manager`, params, cancelToken ? { cancelToken } : undefined)
	} catch (e) { throw e; }

	let { data } = response;
	if (data == undefined) { throw new Error('Desculpe, ocorreu algum erro.'); }

}

const addCostumerToLine = async (cancelToken, place, params) => {

	let response;
	try { response = await Axios().post(`/web/lines/${place}`, params, cancelToken ? { cancelToken } : undefined)
	} catch (e) { 
		const errMsg = ((e.response || {}).data || {}).message;
		throw errMsg != undefined ? new Error(errMsg) : e; 
	}

	let { data } = response;
	if (data == undefined) { throw new Error('Desculpe, ocorreu algum erro.'); }

}

const getPlaceLine = async (cancelToken, place, skip=0, limit=15, lineMoment=0) => {

	const params = `?limit=${limit}&skip=${skip}&showPast=${lineMoment}`;

	let response;
	try { response = await Axios().get(`/web/lines/${place}${params}`, cancelToken ? { cancelToken } : undefined)
	} catch (e) { throw e; }

	let { data } = response;
	if (data == undefined) { throw new Error('Desculpe, ocorreu algum erro.'); }

	return data;

}

const putUserStatusInLine = async (cancelToken, place, status, userId) => {

	const params = { status, userId };

	let response;
	try { response = await Axios().put(`/web/lines/${place}`, params, cancelToken ? { cancelToken } : undefined)
	} catch (e) { throw e; }

	let { data } = response;
	if (data == undefined) { throw new Error('Desculpe, ocorreu algum erro.'); }

}

const removeUserFromPlaceLine = async (cancelToken, place, userId) => {

	const params = { userId };

	let response;
	try { response = await Axios().delete(`/web/lines/${place}`, {data:params}, cancelToken ? { cancelToken } : undefined)
	} catch (e) { throw e; }

	let { data } = response;
	if (data == undefined) { throw new Error('Desculpe, ocorreu algum erro.'); }

}

const getLineOverview = async (cancelToken, place) => {

	let response;
	try { response = await Axios().get(`/web/lines/${place}/overview`, cancelToken ? { cancelToken } : undefined)
	} catch (e) { throw e; }

	let { data } = response;
	if (data == undefined) { throw new Error('Desculpe, ocorreu algum erro.'); }

	return data;

}

const getUsersList = async (cancelToken, skip=0, limit=15) => {
	let params = `?skip=${skip}&limit=${limit}`;

	let response;
	try { response = await Axios().get(`/web/users${params}`, cancelToken ? { cancelToken } : undefined)
	} catch (e) { throw e; }

	let { data } = response;
	if (data == undefined) { throw new Error('Desculpe, ocorreu algum erro.'); }

	return data;
}

const createUser = async (cancelToken, params) => {

	let response;
	try { response = await Axios().post(`/web/users`, params, cancelToken ? { cancelToken } : undefined)
	} catch (e) { throw e; }

	let { data } = response;
	if (data == undefined) { throw new Error('Desculpe, ocorreu algum erro.'); }

	return data.savedPlace;

}

const editUser = async (cancelToken, userId, params) => {
	let response;
	try { response = await Axios().put(`/web/users/${userId}`, params, cancelToken ? { cancelToken } : undefined)
	} catch (e) { throw e; }

	let { data } = response;
	if (data == undefined) { throw new Error('Desculpe, ocorreu algum erro.'); }

	return data;
}

const getSignedRequestForUserImage = async (cancelToken, userId, fileType) => {

	let response;
	try { response = await Axios().get(`/web/users/${userId}/image?fileType=${fileType}`, cancelToken ? { cancelToken } : undefined)
	} catch (e) { throw e; }

	let { data } = response;
	if (data == undefined) { throw new Error('Desculpe, ocorreu algum erro.'); }

	const signedRequest = data.signed_request;
	const url = data.url;

	return {signedRequest, url};
}

const getUserById = async (cancelToken, userId) => {
	if (userId == undefined) { throw new Error('Usuário não tem identificador!'); }

	let response;
	try { response = await Axios().get(`/web/users/${userId}`, cancelToken ? { cancelToken } : undefined)
	} catch (e) { throw e; }

	let { data } = response;
	if (data == undefined) { throw new Error('Desculpe, ocorreu algum erro.'); }

	return data.user;
}

const useCancelToken = () => {
  const axiosSource = useRef(null);
  const newCancelToken = useCallback(() => {
    axiosSource.current = CancelToken.source();
    return axiosSource.current.token;
  }, []);

  useEffect(
    () => () => {
      if (axiosSource.current) axiosSource.current.cancel();
    },
    []
  );

  return { newCancelToken, isCancel };
};

export {
	CancelToken,
	useCancelToken, 
	signUserIn, 
	getMe, 
	getPlacesList, 
	getPlaceById,
	getCategories,
	createPlace,
	editPlace,
	getSignedRequestForPlaceImage,
	uploadFile,
	getManagers,
	addUserAccess,
	removeUserAccess,
	createManagerUser,
	addCostumerToLine,
	getPlaceLine,
	putUserStatusInLine,
	removeUserFromPlaceLine,
	getLineOverview,
	getUsersList,
	createUser,
	editUser,
	getUserById,
	getSignedRequestForUserImage
}