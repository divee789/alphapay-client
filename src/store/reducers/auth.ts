import * as actionTypes from '../actions/actionTypes'
import { Storage } from '../../services/storage-services'
import Request from '../../services/api-services'

const api = new Request(process.env.BASE_URL)

const initialState = {
    token: null,
    user: null,
    processing: false,
    isAuth: api.isloggedIn(),
    error: null,
    update_error: null,
    message: null
}

const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.authConstants.LOGIN_REQUEST:
            return {
                ...state,
                processing: true,
                error: {}
            };
        case actionTypes.authConstants.LOGIN_FAILURE:
            return {
                ...state,
                processing: false,
                token: null,
                isAuth: false,
                error: action.errors.response.data
            };
        case actionTypes.authConstants.LOGIN_SUCCESS:
            return {
                ...state,
                token: action.client.data.access_token,
                isAuth: true,
                processing: false,
                user: action.client.client,
                error: null
            };
        case actionTypes.authConstants.LOGOUT:
            return {
                ...state,
                token: null,
                isAuth: false,
                processing: false,
                user: null,
                error: null
            };

        case actionTypes.authConstants.SIGNUP_REQUEST:
            return {
                ...state,
                processing: true,
                error: null
            };
        case actionTypes.authConstants.SIGNUP_FAILURE:
            return {
                ...state,
                processing: false,
                token: null,
                isAuth: false,
                error: action.errors.response.data
            };
        case actionTypes.authConstants.SIGNUP_SUCCESS:
            return {
                ...state,
                token: action.user.access_token,
                isAuth: true,
                processing: false,
                user: action.user.client,
                error: null
            };
        case actionTypes.authConstants.UPDATE_USER_SUCCESS:
            return {
                ...state,
                processing: false,
                user: action.user.client,
                message: action.user.message,
                update_error: null
            };
        case actionTypes.authConstants.UPDATE_USER_FAILURE:
            return {
                ...state,
                processing: false,
                update_error: action.error
            };
        default:
            return state
    }
}

export default authReducer