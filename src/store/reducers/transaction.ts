import * as actionTypes from '../actions/actionTypes';
import { TransactionReducer } from '../interfaces';

const initialState: TransactionReducer = {
  transactions: null,
  processing: false,
  error: null,
  pager: null,
};

const transactionReducer = (state = initialState, action: any): TransactionReducer => {
  switch (action.type) {
    case actionTypes.transactionConstants.FETCH_TRANSACTIONS_REQUEST:
      return {
        ...state,
        processing: true,
        error: null,
      };
    case actionTypes.transactionConstants.FETCH_TRANSACTIONS_FAILURE:
      return {
        ...state,
        processing: false,
        transactions: null,
        error: action.error,
      };
    case actionTypes.transactionConstants.FETCH_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        transactions: action.data.transactions,
        processing: false,
        pager: action.data.pager,
        error: null,
      };
    default:
      return state;
  }
};

export default transactionReducer;
