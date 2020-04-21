import { Dispatch } from 'redux';

import * as actionTypes from './actionTypes';
import { Wallet } from '../types';

import APIRequest from '../../services/api-services';
import APIServiceError from '../../services/error-services';

const Request = new APIRequest();

export function get_client_wallet() {
  function request() {
    return { type: actionTypes.walletConstants.FETCH_WALLET_REQUEST };
  }
  function success(wallet: Wallet) {
    return { type: actionTypes.walletConstants.FETCH_WALLET_SUCCESS, wallet };
  }
  function failure(errors: any) {
    return { type: actionTypes.walletConstants.FETCH_WALLET_FAILURE, errors };
  }

  return async (dispatch: Dispatch) => {
    try {
      await dispatch(request());
      const wallet = await Request.getWallet();
      console.log('action_wallet', wallet);
      dispatch(success(wallet.wallet));
    } catch (error) {
      if (error instanceof APIServiceError) {
        console.log('error in getting wallet', error);
        dispatch(failure(error));
        throw error.response.data;
      }
    }
  };
}

export function fund_client_wallet(data: {
  amount: number;
  narration: string;
  processor: string;
  processor_reference: string;
  transaction_status: string;
}) {
  function request() {
    return { type: actionTypes.walletConstants.FUND_WALLET_REQUEST };
  }
  function success(wallet: Wallet) {
    return { type: actionTypes.walletConstants.FUND_WALLET_SUCCESS, wallet };
  }
  function failure(errors: any) {
    return { type: actionTypes.walletConstants.FUND_WALLET_FAILURE, errors };
  }

  return async (dispatch: Dispatch) => {
    try {
      await dispatch(request());
      const wallet = await Request.fundWallet(data);
      dispatch(success(wallet.wallet));
    } catch (error) {
      if (error instanceof APIServiceError) {
        dispatch(failure(error));
        throw error.response.data;
      }
    }
  };
}

export function transfer_funds(data: {
  amount: number;
  narration: string;
  recipient_phone_number: string;
  transaction_pin?: number;
}) {
  function request() {
    return { type: actionTypes.walletConstants.FUND_WALLET_REQUEST };
  }
  function success(wallet: Wallet) {
    return { type: actionTypes.walletConstants.FUND_WALLET_SUCCESS, wallet };
  }

  return async (dispatch: Dispatch) => {
    try {
      await dispatch(request());
      const wallet = await Request.transferFunds(data);
      dispatch(success(wallet.wallet));
    } catch (error) {
      if (error instanceof APIServiceError) {
        throw error.response.data;
      }
    }
  };
}

export function set_transaction_pin(data: { transaction_pin: number }) {
  function request() {
    return { type: actionTypes.walletConstants.FUND_WALLET_REQUEST };
  }
  function success(wallet: Wallet) {
    return { type: actionTypes.walletConstants.FUND_WALLET_SUCCESS, wallet };
  }
  function failure(error: any) {
    return { type: actionTypes.walletConstants.SET_PIN_FAILURE, error };
  }

  return async (dispatch: Dispatch) => {
    try {
      await dispatch(request());
      const req = await Request.setTransactionPin(data);
      dispatch(success(req.wallet));
    } catch (error) {
      if (error instanceof APIServiceError) {
        dispatch(failure(error.response.data.message));
        throw error.response.data;
      }
    }
  };
}

export function new_notifications() {
  function set_notifications(notifications: any) {
    return { type: actionTypes.walletConstants.SET_NOTIFICATIONS, notifications };
  }

  return async (dispatch: Dispatch) => {
    try {
      const apiRes = await Request.getNotifications();
      await dispatch(set_notifications(apiRes.notifications));
    } catch (error) {
      console.log(error);
      if (error instanceof APIServiceError) {
        console.log('error in getting transaction', error);
        throw error.response.data;
      }
    }
  };
}
