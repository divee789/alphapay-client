import axios from 'axios'
import * as actionTypes from './actionTypes';
import { Logger, history } from '../../utils/index';
import APIRequest from '../../services/api-services';
import APIServiceError from '../../services/error-services';

const authBaseURL = process.env.BASE_URL || 'http://localhost:1000';
const authAPIRequest = new APIRequest(authBaseURL);

export function logout() {
    function request() {
        return { type: actionTypes.authConstants.LOGOUT };
    }
    return async (dispatch: any) => {
        try {
            await authAPIRequest.logout();
            await dispatch(request());
        } catch (error) {
            if (error instanceof APIServiceError) {
                throw error.response.data;
            }
        }
    };
}
export function login(data: any) {
    console.log('data', data);
    function request() {
        return { type: actionTypes.authConstants.LOGIN_REQUEST };
    }
    function success(user: any) {
        return { type: actionTypes.authConstants.LOGIN_SUCCESS, user };
    }
    function failure(errors: any) {
        return { type: actionTypes.authConstants.LOGIN_FAILURE, errors };
    }
    return async (dispatch: any) => {
        try {
            await dispatch(request());
            const userDetails = await authAPIRequest.logIn(data);
            dispatch(success(userDetails));
        } catch (error) {
            if (error instanceof APIServiceError) {
                console.log('error in getting auth', error);
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
            dispatch(success(userDetails));
        } catch (error) {
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
    function failure(errors: any) {
        return { type: actionTypes.authConstants.UPDATE_USER_FAILURE, errors };
    }
    return async (dispatch: any) => {
        try {
            await dispatch(request());
            if (data.profile_image) {
                console.log('redux image data', data)
                dispatch(success(data));
                return
            }
            const userDetails = await authAPIRequest.update(data);
            console.log(userDetails)
            dispatch(success(userDetails));
        } catch (error) {
            if (error instanceof APIServiceError) {
                dispatch(failure(error));
                throw error.response.data;
            }
        }
    };
}
