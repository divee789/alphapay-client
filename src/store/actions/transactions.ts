/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Dispatch } from 'redux';

import * as actionTypes from './actionTypes';
import { Transaction } from '../types';

import APIRequest from '../../services/api-services';
import APIServiceError from '../../services/error-services';

const Request = new APIRequest();

export function getUserTransactions(page?: number) {
  function request() {
    return { type: actionTypes.transactionConstants.FETCH_TRANSACTIONS_REQUEST };
  }
  function success(transactions: [Transaction], pager: unknown) {
    const data = {
      transactions,
      pager,
    };
    return { type: actionTypes.transactionConstants.FETCH_TRANSACTIONS_SUCCESS, data };
  }
  function failure(error: unknown) {
    return { type: actionTypes.transactionConstants.FETCH_TRANSACTIONS_FAILURE, error };
  }

  return async (dispatch: Dispatch) => {
    try {
      dispatch(request());
      const data = await Request.getTransactions(page);
      dispatch(success(data.transactions, data.pager));
    } catch (error) {
      if (error instanceof APIServiceError) {
        dispatch(failure(error));
        throw error.response.data;
      }
    }
  };
}

export function filterUserTransactions(data: unknown, page?: number) {
  function request() {
    return { type: actionTypes.transactionConstants.FETCH_TRANSACTIONS_REQUEST };
  }
  function success(transactions: [Transaction], pager) {
    const data = {
      transactions,
      pager,
    };
    return { type: actionTypes.transactionConstants.FETCH_TRANSACTIONS_SUCCESS, data };
  }
  function failure(error: unknown) {
    return { type: actionTypes.transactionConstants.FETCH_TRANSACTIONS_FAILURE, error };
  }

  return async (dispatch: Dispatch) => {
    try {
      await dispatch(request());
      const response = await Request.filterTransactions(data, page);
      await dispatch(success(response.transactions, response.pager));
    } catch (error) {
      if (error instanceof APIServiceError) {
        dispatch(failure(error));
        throw error.response.data;
      }
    }
  };
}
