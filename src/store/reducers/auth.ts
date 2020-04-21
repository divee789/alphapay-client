import * as actionTypes from '../actions/actionTypes';
import { Storage } from '../../services/storage-services';

const initialState = {
  user: null,
  processing: false,
  isAuth: Storage.checkAuthentication(),
  error: null,
  update_error: null,
  message: null,
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.authConstants.LOGIN_REQUEST:
      return {
        ...state,
        processing: true,
        error: null,
      };
    case actionTypes.authConstants.LOGIN_FAILURE:
      return {
        ...state,
        processing: false,
        isAuth: false,
        error: action.errors.response.data,
      };
    case actionTypes.authConstants.LOGIN_SUCCESS:
      return {
        ...state,
        isAuth: true,
        processing: false,
        user: action.client.client,
        error: null,
      };
    case actionTypes.authConstants.FETCH_USER_SUCCESS:
      return {
        ...state,
        processing: false,
        user: action.client,
        error: null,
      };
    case actionTypes.authConstants.LOGOUT:
      return {
        ...state,
        isAuth: false,
        processing: false,
        user: null,
        error: null,
      };

    case actionTypes.authConstants.SIGNUP_REQUEST:
      return {
        ...state,
        processing: true,
        error: null,
      };
    case actionTypes.authConstants.SIGNUP_FAILURE:
      return {
        ...state,
        processing: false,
        isAuth: false,
        error: action.errors.response.data,
      };
    case actionTypes.authConstants.SIGNUP_SUCCESS:
      return {
        ...state,
        isAuth: true,
        processing: false,
        user: action.user.client,
        error: null,
      };
    case actionTypes.authConstants.UPDATE_USER_SUCCESS:
      return {
        ...state,
        processing: false,
        user: action.user.client,
        message: action.user.message,
        update_error: null,
      };
    case actionTypes.authConstants.UPDATE_USER_FAILURE:
      return {
        ...state,
        processing: false,
        update_error: action.error,
      };
    default:
      return state;
  }
};

export default authReducer;
