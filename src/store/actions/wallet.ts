/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Dispatch } from 'redux';
import { WalletActionTypes, walletConstants } from './actionTypes';
import { Wallet } from '../types';
import APIServices from '../../services/api-services';
import APIServiceError from '../../services/error-services';

const API = new APIServices();

export function getUserWallet() {
  function success(wallet: Wallet): WalletActionTypes {
    return { type: walletConstants.FETCH_WALLET_SUCCESS, wallet };
  }

  return async (dispatch: Dispatch) => {
    try {
      const data = await API.getWallet();
      await dispatch(success(data.data.wallet));
    } catch (error) {
      if (error instanceof APIServiceError) {
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
  function success(wallet: Wallet): WalletActionTypes {
    return { type: walletConstants.FUND_WALLET_SUCCESS, wallet };
  }

  return async (dispatch: Dispatch) => {
    try {
      const response = await API.fundWallet(data);
      console.log('WALLET', response);
      await dispatch(success(response.data.wallet));
    } catch (error) {
      if (error instanceof APIServiceError) {
        throw error.response.data;
      }
    }
  };
}

export function checkoutUserWallet(data: {
  amount: string;
  bank_code: string;
  bank_account: string;
  bank_name: string;
  account_name: string;
  narration: string;
  pin: string;
}) {
  function success(wallet: Wallet): WalletActionTypes {
    return { type: walletConstants.CHECKOUT_WALLET_SUCCESS, wallet };
  }

  return async (dispatch: Dispatch) => {
    try {
      const response = await API.checkoutWallet(data);
      await dispatch(success(response.data.wallet));
    } catch (error) {
      if (error instanceof APIServiceError) {
        throw error.response.data;
      }
    }
  };
}

export function transferFunds(data: {
  amount: number;
  narration: string;
  recipient_phone_number: string;
  pin: string;
}) {
  function success(wallet: Wallet): WalletActionTypes {
    return { type: walletConstants.FUND_WALLET_SUCCESS, wallet };
  }

  return async (dispatch: Dispatch) => {
    try {
      const response = await API.transferFunds(data);
      await dispatch(success(response.data.wallet));
    } catch (error) {
      if (error instanceof APIServiceError) {
        throw error.response.data;
      }
    }
  };
}

export function transferToBeneficiary(data: { amount: string; narration: string; pin: string; beneficiaryId: string }) {
  function success(wallet: Wallet): WalletActionTypes {
    return {
      type: walletConstants.TRANSFER_TO_BENEFICIARY,
      wallet,
    };
  }

  return async (dispatch: Dispatch) => {
    try {
      const response = await API.transferToBeneficiary(data);
      dispatch(success(response.data.wallet));
    } catch (error) {
      throw error.response.data;
    }
  };
}

export function updateWallet(wallet): WalletActionTypes {
  return { type: walletConstants.FUND_WALLET_SUCCESS, wallet };
}

export function setTransactionPin(data: { pin: string }) {
  function success(wallet: Wallet): WalletActionTypes {
    return { type: walletConstants.FUND_WALLET_SUCCESS, wallet };
  }

  return async (dispatch: Dispatch) => {
    try {
      const response = await API.setTransactionPin(data);
      await dispatch(success(response.data.wallet));
    } catch (error) {
      if (error instanceof APIServiceError) {
        throw error.response.data;
      }
    }
  };
}

export function getNotifications() {
  function setNotifications(notifications: unknown) {
    return { type: walletConstants.SET_NOTIFICATIONS, notifications };
  }

  return async (dispatch: Dispatch) => {
    try {
      const apiRes = await API.getNotifications();
      await dispatch(setNotifications(apiRes.notifications));
    } catch (error) {
      if (error instanceof APIServiceError) {
        throw error.response.data;
      }
    }
  };
}
