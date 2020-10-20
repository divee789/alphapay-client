import { Dispatch } from 'redux';

import * as actionTypes from './actionTypes';

import APIRequest from '../../services/api-services';
import APIServiceError from '../../services/error-services';

const API = new APIRequest();

export function getPaymentRequests() {
  function request() {
    return { type: actionTypes.paymentRequestConstants.FETCH_PAYMENTS_REQUEST };
  }

  function success(paymentRequests) {
    return { type: actionTypes.paymentRequestConstants.FETCH_PAYMENTS_SUCCESS, paymentRequests };
  }

  function failure(error) {
    return { type: actionTypes.paymentRequestConstants.FETCH_PAYMENTS_FAILURE, error };
  }

  return async (dispatch: Dispatch) => {
    try {
      await dispatch(request());
      const data = await API.getPaymentRequests();
      await dispatch(success(data));
    } catch (error) {
      if (error instanceof APIServiceError) {
        await dispatch(failure(error));
        throw error.response.data;
      }
    }
  };
}
