import * as actionTypes from '../actions/actionTypes';
import { WalletReducer } from '../interfaces';

const initialState: WalletReducer = {
  wallet: null,
  processing: false,
  error: null,
  pinError: null,
  fundProcessing: false,
};

const walletReducer = (state = initialState, action: any): WalletReducer => {
  switch (action.type) {
    case actionTypes.walletConstants.FETCH_WALLET_REQUEST:
      return {
        ...state,
        processing: true,
        error: null,
      };
    case actionTypes.walletConstants.FETCH_WALLET_FAILURE:
      return {
        ...state,
        processing: false,
        wallet: null,
        error: action.errors.response.data,
      };
    case actionTypes.walletConstants.FETCH_WALLET_SUCCESS:
      return {
        ...state,
        wallet: action.wallet,
        processing: false,
        error: null,
      };
    case actionTypes.walletConstants.FUND_WALLET_REQUEST:
      return {
        ...state,
        fundProcessing: true,
        error: null,
      };
    case actionTypes.walletConstants.FUND_WALLET_FAILURE:
      return {
        ...state,
        fundProcessing: false,
        wallet: null,
        error: action.errors.response.data,
      };
    case actionTypes.walletConstants.FUND_WALLET_SUCCESS:
      return {
        ...state,
        wallet: action.wallet,
        fundProcessing: false,
        error: null,
      };
    case actionTypes.walletConstants.SET_PIN_FAILURE:
      return {
        ...state,
        pinError: action.error,
      };
    default:
      return state;
  }
};

export default walletReducer;
