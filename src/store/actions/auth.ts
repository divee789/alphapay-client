/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { Dispatch } from 'redux';
import * as actionTypes from './actionTypes';
import APIRequest from '../../services/api-services';
import APIServiceError from '../../services/error-services';

const authAPIRequest = new APIRequest();

export function logOut() {
  function request(): {
    type: string;
  } {
    return { type: actionTypes.authConstants.LOGOUT };
  }
  return async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch(request());
      await authAPIRequest.logOut();
    } catch (error) {
      if (error instanceof APIServiceError) {
        throw error.response.data;
      }
    }
  };
}
export function logIn(data: { email: string; password: string }) {
  function request() {
    return { type: actionTypes.authConstants.LOGIN_REQUEST };
  }
  function success() {
    return { type: actionTypes.authConstants.LOGIN_SUCCESS };
  }
  function failure(errors: unknown) {
    return { type: actionTypes.authConstants.LOGIN_FAILURE, errors };
  }
  return async (dispatch: Dispatch) => {
    try {
      dispatch(request());
      await authAPIRequest.logIn(data);
      dispatch(success());
    } catch (error) {
      dispatch(failure(error));
      if (error instanceof APIServiceError) {
        if (error.response.status === 403) {
          throw new Error('2FA Required');
        }
        throw error.response.data;
      }
      throw error;
    }
  };
}

export function twoFaVerify(data: { email: string; token: string }) {
  function success() {
    return { type: actionTypes.authConstants.LOGIN_SUCCESS };
  }

  return async (dispatch: Dispatch) => {
    try {
      await authAPIRequest.twoFaAuthorize(data);
      dispatch(success());
    } catch (error) {
      if (error instanceof APIServiceError) {
        throw error.response.data;
      }
      throw error;
    }
  };
}

export function getUser() {
  function request() {
    return { type: actionTypes.authConstants.LOGIN_REQUEST };
  }
  function success(user: unknown) {
    return { type: actionTypes.authConstants.FETCH_USER_SUCCESS, user };
  }
  function failure(errors: unknown) {
    return { type: actionTypes.authConstants.LOGIN_FAILURE, errors };
  }
  return async (dispatch: Dispatch) => {
    try {
      dispatch(request());
      const data = await authAPIRequest.getUser();
      dispatch(success(data.data.user));
    } catch (error) {
      if (error instanceof APIServiceError) {
        dispatch(failure(error));
        throw error.response.data;
      }
    }
  };
}

export function signUp(data) {
  function request() {
    return { type: actionTypes.authConstants.SIGNUP_REQUEST };
  }
  function success() {
    return { type: actionTypes.authConstants.SIGNUP_SUCCESS };
  }
  function failure(errors) {
    return { type: actionTypes.authConstants.SIGNUP_FAILURE, errors };
  }
  return async (dispatch: Dispatch) => {
    try {
      dispatch(request());
      await authAPIRequest.signUp(data);
      dispatch(success());
    } catch (error) {
      if (error instanceof APIServiceError) {
        dispatch(failure(error));
        throw error.response.data;
      }
    }
  };
}
export function updateUser(data: { full_name: string; username: string }) {
  function request() {
    return { type: actionTypes.authConstants.SIGNUP_REQUEST };
  }
  function success(user) {
    return { type: actionTypes.authConstants.UPDATE_USER_SUCCESS, user };
  }
  function failure(error) {
    return { type: actionTypes.authConstants.UPDATE_USER_FAILURE, error };
  }
  return async (dispatch: Dispatch) => {
    try {
      dispatch(request());
      const response = await authAPIRequest.update(data);
      dispatch(success(response.data.user));
    } catch (error) {
      if (error instanceof APIServiceError) {
        dispatch(failure(error));
        throw error.response.data;
      }
    }
  };
}
