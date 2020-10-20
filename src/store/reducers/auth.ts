import decode from 'jwt-decode';
import * as actionTypes from '../actions/actionTypes';
import { Storage } from '../../services/storage-services';

const isTokenExpired = (token) => {
  const decoded: { exp: any } = decode(token);
  const exp: number = decoded.exp;
  // Refresh the token a minute early to avoid latency issues
  const expirationTime = exp * 1000 - 60000;
  if (Date.now() >= expirationTime) {
    return true;
  } else {
    return false;
  }
};

const isLoggedIn = () => {
  const token = Storage.checkAuthentication();
  //Check for existence of token
  if (token) {
    const expired = isTokenExpired(token);
    if (expired) {
      return false;
    }
    return true;
  }
  return false;
};

const initialState = {
  user: null,
  processing: false,
  isAuth: isLoggedIn(),
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
        error: null,
      };
    case actionTypes.authConstants.FETCH_USER_SUCCESS:
      return {
        ...state,
        processing: false,
        user: action.user,
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
        error: null,
      };
    case actionTypes.authConstants.UPDATE_USER_SUCCESS:
      return {
        ...state,
        processing: false,
        user: action.user,
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
