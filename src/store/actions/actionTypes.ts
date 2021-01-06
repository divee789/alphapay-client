import { Beneficiary, Wallet, Bank } from '../types';

export const authConstants = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',

  SIGNUP_REQUEST: 'SIGNUP_REQUEST',
  SIGNUP_FAILURE: 'SIGNUP_FAILURE',
  SIGNUP_SUCCESS: 'SIGNUP_SUCCESS',

  REFRESH_REQUEST: 'REFRESH_REQUEST',
  REFRESH_FAILURE: 'REFRESH_FAILURE',
  REFRESH_SUCCESS: 'REFRESH_SUCCESS',

  UPDATE_USER_REQUEST: 'UPDATE_USER_REQUEST',
  UPDATE_USER_FAILURE: 'UPDATE_USER_FAILURE',
  UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',

  FETCH_USER_SUCCESS: 'FETCH_USER_SUCCESS',
};

export const walletConstants = {
  FETCH_WALLET_SUCCESS: 'FETCH_WALLET_SUCCESS',
  FUND_WALLET_SUCCESS: 'FUND_WALLET_SUCCESS',
  CHECKOUT_WALLET_SUCCESS: 'FUND_WALLET_SUCCESS',
  TRANSFER_TO_BENEFICIARY: 'TRANSFER_TO_BENEFICIARY',
  SET_NOTIFICATIONS: 'SET_NOTIFICATIONS',
};

interface FetchWalletAction {
  type: typeof walletConstants.FETCH_WALLET_SUCCESS;
  wallet: Wallet;
}

interface FundWalletAction {
  type: typeof walletConstants.FUND_WALLET_SUCCESS;
  wallet: Wallet;
}

interface CheckoutWalletAction {
  type: typeof walletConstants.CHECKOUT_WALLET_SUCCESS;
  wallet: Wallet;
}

interface TransferToBeneficiaryAction {
  type: typeof walletConstants.TRANSFER_TO_BENEFICIARY;
  wallet: Wallet;
}

export type WalletActionTypes =
  | FetchWalletAction
  | FundWalletAction
  | CheckoutWalletAction
  | TransferToBeneficiaryAction;

export const beneficiaryConstants = {
  FETCH_BENEFICIARIES_SUCCESS: 'FETCH_BENEFICIARIES_SUCCESS',
};

interface FetchBeneficiariesAction {
  type: typeof beneficiaryConstants.FETCH_BENEFICIARIES_SUCCESS;
  beneficiaries: Array<Beneficiary>;
}

export type BeneficiaryActionTypes = FetchBeneficiariesAction;

export const miscConstants = {
  FETCH_BANKS_SUCCESS: 'FETCH_BANKS_SUCCESS',
};

interface FetchBanksAction {
  type: typeof miscConstants.FETCH_BANKS_SUCCESS;
  banks: Array<Bank>;
}

export type MiscActionTypes = FetchBanksAction;

export const transactionConstants = {
  FETCH_TRANSACTIONS_REQUEST: 'FETCH_TRANSACTIONS_REQUEST',
  FETCH_TRANSACTIONS_FAILURE: 'FETCH_TRANSACTIONS_FAILURE',
  FETCH_TRANSACTIONS_SUCCESS: 'FETCH_TRANSACTIONS_SUCCESS',
};

export const paymentRequestConstants = {
  FETCH_PAYMENTS_REQUEST: 'FETCH_PAYMENTS_REQUEST',
  FETCH_PAYMENTS_FAILURE: 'FETCH_PAYMENTS_FAILURE',
  FETCH_PAYMENTS_SUCCESS: 'FETCH_PAYMENTS_SUCCESS',
};

export const uiConstants = {
  SWITCH_MODE_LIGHT: 'SWITCH_MODE_LIGHT',
  SWITCH_MODE_DARK: 'SWITCH_MODE_DARK',
};
