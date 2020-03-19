import axios from 'axios'
import * as actionTypes from './actionTypes';
import { Logger, history } from '../../utils/index';
import APIRequest from '../../services/api-services';
import APIServiceError from '../../services/error-services';

const authBaseURL = process.env.BASE_URL || 'http://localhost:7000';
const authAPIRequest = new APIRequest(authBaseURL);

export function logout(email?: string) {
    console.log('logging out', email)
    function request() {
        return { type: actionTypes.authConstants.LOGOUT };
    }
    return async (dispatch: any) => {
        try {
            await dispatch(request());
            await authAPIRequest.logOut(email);
        } catch (error) {
            if (error instanceof APIServiceError) {
                throw error.response.data;
            }
        }
    };
}
export function login(data: any) {
    function request() {
        return { type: actionTypes.authConstants.LOGIN_REQUEST };
    }
    function success(client: any) {
        return { type: actionTypes.authConstants.LOGIN_SUCCESS, client };
    }
    function failure(errors: any) {
        return { type: actionTypes.authConstants.LOGIN_FAILURE, errors };
    }
    return async (dispatch: any) => {
        try {
            await dispatch(request());
            const userDetails = await authAPIRequest.logIn(data);
            await dispatch(success(userDetails));
        } catch (error) {

            if (error instanceof APIServiceError) {
                dispatch(failure(error));
                throw error.response.data;
            }
        }
    };
}

export function getUser() {
    function request() {
        return { type: actionTypes.authConstants.LOGIN_REQUEST };
    }
    function success(client: any) {
        return { type: actionTypes.authConstants.FETCH_USER_SUCCESS, client };
    }
    function failure(errors: any) {
        return { type: actionTypes.authConstants.LOGIN_FAILURE, errors };
    }
    return async (dispatch: any) => {
        try {
            await dispatch(request());
            const userDetails = await authAPIRequest.getUser();
            await dispatch(success(userDetails));
        } catch (error) {

            if (error instanceof APIServiceError) {
                dispatch(failure(error));
                throw error.response.data;
            }
        }
    };
}


export function signup(data: any) {
    function request() {
        return { type: actionTypes.authConstants.SIGNUP_REQUEST };
    }
    function success(user: any) {
        return { type: actionTypes.authConstants.SIGNUP_SUCCESS, user };
    }
    function failure(errors: any) {
        return { type: actionTypes.authConstants.SIGNUP_FAILURE, errors };
    }
    return async (dispatch: any) => {
        try {
            await dispatch(request());
            const userDetails = await authAPIRequest.signUp(data);
            dispatch(success(userDetails.data));
        } catch (error) {
            console.log(error)
            if (error instanceof APIServiceError) {
                dispatch(failure(error));
                throw error.response.data;
            }
        }
    };
}
export function update(data: any) {
    function request() {
        return { type: actionTypes.authConstants.SIGNUP_REQUEST };
    }
    function success(user: any) {
        return { type: actionTypes.authConstants.UPDATE_USER_SUCCESS, user };
    }
    function failure(error: any) {
        return { type: actionTypes.authConstants.UPDATE_USER_FAILURE, error };
    }
    return async (dispatch: any) => {
        try {
            await dispatch(request());
            if (data.profile_image) {
                const user = {
                    client: data
                }
                await dispatch(success(user));
                return
            }
            const userDetails = await authAPIRequest.update(data);
            dispatch(success(userDetails));
        } catch (error) {
            if (error instanceof APIServiceError) {
                dispatch(failure(error));
                throw error.response.data;
            }
        }
    };
}

