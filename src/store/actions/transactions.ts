import { Dispatch } from 'redux';

import * as actionTypes from './actionTypes';
import { Transaction } from '../types';

import APIRequest from '../../services/api-services';
import APIServiceError from '../../services/error-services';

const Request = new APIRequest();

export function get_client_transactions(page?: number) {
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
  function failure(error: any) {
    return { type: actionTypes.transactionConstants.FETCH_TRANSACTIONS_FAILURE, error };
  }

  return async (dispatch: Dispatch) => {
    try {
      await dispatch(request());
      const transactions = await Request.getTransactions(page);
      await dispatch(success(transactions.transactions, transactions.pager));
    } catch (error) {
      console.log(error);
      if (error instanceof APIServiceError) {
        console.log('error in getting transaction', error);
        await dispatch(failure(error));
        throw error.response.data;
      }
    }
  };
}

export function filter_client_transactions(data: any, page?: number) {
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
  function failure(error: any) {
    return { type: actionTypes.transactionConstants.FETCH_TRANSACTIONS_FAILURE, error };
  }

  return async (dispatch: Dispatch) => {
    try {
      await dispatch(request());
      const transactions = await Request.filterTransactions(data, page);
      await dispatch(success(transactions.transactions, transactions.pager));
    } catch (error) {
      console.log(error);
      if (error instanceof APIServiceError) {
        console.log('error in getting transaction', error);
        dispatch(failure(error));
        throw error.response.data;
      }
    }
  };
}
