import { WalletActionTypes, walletConstants } from '../actions/actionTypes';
import { WalletReducer } from '../interfaces';

const initialState: WalletReducer = {
  wallet: null,
};

const walletReducer = (state = initialState, action: WalletActionTypes): WalletReducer => {
  switch (action.type) {
    case walletConstants.FETCH_WALLET_SUCCESS:
      return {
        ...state,
        wallet: action.wallet,
      };
    case walletConstants.FUND_WALLET_SUCCESS:
      return {
        ...state,
        wallet: action.wallet,
      };
    case walletConstants.TRANSFER_TO_BENEFICIARY:
      return {
        ...state,
        wallet: action.wallet,
      };
    default:
      return state;
  }
};

export default walletReducer;
