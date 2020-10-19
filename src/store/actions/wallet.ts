/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Dispatch } from 'redux';

import * as actionTypes from './actionTypes';
import { Wallet } from '../types';

import APIRequest from '../../services/api-services';
import APIServiceError from '../../services/error-services';

const Request = new APIRequest();

export function getUserWallet() {
  function request() {
    return { type: actionTypes.walletConstants.FETCH_WALLET_REQUEST };
  }
  function success(wallet: Wallet) {
    return { type: actionTypes.walletConstants.FETCH_WALLET_SUCCESS, wallet };
  }
  function failure(errors: unknown) {
    return { type: actionTypes.walletConstants.FETCH_WALLET_FAILURE, errors };
  }

  return async (dispatch: Dispatch) => {
    try {
      await dispatch(request());
      const data = await Request.getWallet();
      await dispatch(success(data.wallet));
    } catch (error) {
      if (error instanceof APIServiceError) {
        await dispatch(failure(error));
        throw error.response.data;
      }
    }
  };
}

export function fundUserWallet(data: {
  amount: string;
  narration: string;
  processor: string;
  processor_reference: string;
  transaction_status: string;
  pin: string;
}) {
  function request() {
    return { type: actionTypes.walletConstants.FUND_WALLET_REQUEST };
  }
  function success(wallet: Wallet) {
    return { type: actionTypes.walletConstants.FUND_WALLET_SUCCESS, wallet };
  }
  function failure(errors) {
    return { type: actionTypes.walletConstants.FUND_WALLET_FAILURE, errors };
  }

  return async (dispatch: Dispatch) => {
    try {
      await dispatch(request());
      const response = await Request.fundWallet(data);
      await dispatch(success(response.wallet));
    } catch (error) {
      if (error instanceof APIServiceError) {
        await dispatch(failure(error));
        throw error.response.data;
      }
    }
  };
}

export function checkoutUserWallet(data: { amount: number; bank_code: string; bank_account: string }) {
  function request() {
    return { type: actionTypes.walletConstants.CHECKOUT_WALLET_REQUEST };
  }
  function success(wallet: Wallet) {
    return { type: actionTypes.walletConstants.CHECKOUT_WALLET_SUCCESS, wallet };
  }
  function failure(errors: unknown) {
    return { type: actionTypes.walletConstants.CHECKOUT_WALLET_FAILURE, errors };
  }

  return async (dispatch: Dispatch) => {
    try {
      await dispatch(request());
      const response = await Request.checkoutWallet(data);
      await dispatch(success(response));
    } catch (error) {
      if (error instanceof APIServiceError) {
        await dispatch(failure(error));
        throw error.response.data;
      }
    }
  };
}

export function transferFunds(data: {
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
      const response = await Request.transferFunds(data);
      await dispatch(success(response.wallet));
    } catch (error) {
      if (error instanceof APIServiceError) {
        throw error.response.data;
      }
    }
  };
}

export function updateWallet(wallet) {
  return { type: actionTypes.walletConstants.FUND_WALLET_SUCCESS, wallet };
}

export function setTransactionPin(data: { transaction_pin: string }) {
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
      const response = await Request.setTransactionPin(data);
      await dispatch(success(response.wallet));
    } catch (error) {
      if (error instanceof APIServiceError) {
        await dispatch(failure(error.response.data.message));
        throw error.response.data;
      }
    }
  };
}

export function getNotifications() {
  function setNotifications(notifications: unknown) {
    return { type: actionTypes.walletConstants.SET_NOTIFICATIONS, notifications };
  }

  return async (dispatch: Dispatch) => {
    try {
      const apiRes = await Request.getNotifications();
      await dispatch(setNotifications(apiRes.notifications));
    } catch (error) {
      if (error instanceof APIServiceError) {
        throw error.response.data;
      }
    }
  };
}
