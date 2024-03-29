import * as actionTypes from '../actions/actionTypes';
import { PaymentRequestReducer } from '../interfaces';

const initialState: PaymentRequestReducer = {
  incomingPaymentRequests: [],
  outgoingPaymentRequests: [],
  error: null,
  processing: false,
};

const paymentRequestReducer = (state = initialState, action: any): PaymentRequestReducer => {
  switch (action.type) {
    case actionTypes.paymentRequestConstants.FETCH_PAYMENTS_REQUEST:
      return {
        ...state,
        processing: true,
      };
    case actionTypes.paymentRequestConstants.FETCH_PAYMENTS_FAILURE:
      return {
        ...state,
        processing: false,
        error: action.error,
      };
    case actionTypes.paymentRequestConstants.FETCH_PAYMENTS_SUCCESS:
      return {
        ...state,
        processing: false,
        incomingPaymentRequests: action.paymentRequests.incomingPaymentRequests,
        outgoingPaymentRequests: action.paymentRequests.outgoingPaymentRequests,
      };
    default:
      return state;
  }
};

export default paymentRequestReducer;
