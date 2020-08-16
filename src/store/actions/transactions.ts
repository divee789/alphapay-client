/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Dispatch } from 'redux';

import * as actionTypes from './actionTypes';
import { Transaction } from '../types';

import APIRequest from '../../services/api-services';
import APIServiceError from '../../services/error-services';

const Request = new APIRequest();

export function getClientTransactions(page?: number) {
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
      await dispatch(request());
      const transactions = await Request.getTransactions(page);
      await dispatch(success(transactions.transactions, transactions.pager));
    } catch (error) {
      if (error instanceof APIServiceError) {
        await dispatch(failure(error));
        throw error.response.data;
      }
    }
  };
}

export function filterClientTransactions(data: unknown, page?: number) {
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
      const transactions = await Request.filterTransactions(data, page);
      await dispatch(success(transactions.transactions, transactions.pager));
    } catch (error) {
      if (error instanceof APIServiceError) {
        dispatch(failure(error));
        throw error.response.data;
      }
    }
  };
}
