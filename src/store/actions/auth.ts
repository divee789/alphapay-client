/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { Dispatch } from 'redux';
import * as actionTypes from './actionTypes';
import APIRequest from '../../services/api-services';
import APIServiceError from '../../services/error-services';
import { Client } from '../types';

const authAPIRequest = new APIRequest();

export function logOut(email?: string) {
  function request(): {
    type: string;
  } {
    return { type: actionTypes.authConstants.LOGOUT };
  }
  return async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch(request());
      await authAPIRequest.logOut(email);
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
  function success(client: unknown) {
    return { type: actionTypes.authConstants.LOGIN_SUCCESS, client };
  }
  function failure(errors: unknown) {
    return { type: actionTypes.authConstants.LOGIN_FAILURE, errors };
  }
  return async (dispatch: Dispatch) => {
    try {
      dispatch(request());
      const userDetails = await authAPIRequest.logIn(data);
      if (userDetails.success === false && userDetails.message === '2FA required') {
        throw new Error('2FA required');
      }
      dispatch(success(userDetails));
    } catch (error) {
      if (error instanceof APIServiceError) {
        dispatch(failure(error));
        throw error.response.data;
      }
      throw error;
    }
  };
}

export function twoFaVerify(data: { email: string; token: string }) {
  function success(client: unknown) {
    return { type: actionTypes.authConstants.LOGIN_SUCCESS, client };
  }

  return async (dispatch: Dispatch) => {
    try {
      const userDetails = await authAPIRequest.twoFaAuthorize(data);
      dispatch(success(userDetails));
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
  function success(client: unknown) {
    return { type: actionTypes.authConstants.FETCH_USER_SUCCESS, client };
  }
  function failure(errors: unknown) {
    return { type: actionTypes.authConstants.LOGIN_FAILURE, errors };
  }
  return async (dispatch: Dispatch) => {
    try {
      dispatch(request());
      const userDetails = await authAPIRequest.getUser();
      dispatch(success(userDetails));
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
  function success(user) {
    return { type: actionTypes.authConstants.SIGNUP_SUCCESS, user };
  }
  function failure(errors) {
    return { type: actionTypes.authConstants.SIGNUP_FAILURE, errors };
  }
  return async (dispatch: Dispatch) => {
    try {
      dispatch(request());
      const userDetails = await authAPIRequest.signUp(data);
      dispatch(success(userDetails.data));
    } catch (error) {
      if (error instanceof APIServiceError) {
        dispatch(failure(error));
        throw error.response.data;
      }
    }
  };
}
export function update(data: Client) {
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
      if (data.profile_image) {
        const user = {
          client: data,
        };
        dispatch(success(user));
        return;
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
