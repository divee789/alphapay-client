
import * as actionTypes from '../actions/actionTypes'


const initialState = {
    transactions: null,
    processing: false,
    error: null,
    transaction: null
}

const transactionReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.transactionConstants.FETCH_TRANSACTIONS_REQUEST:
            return {
                ...state,
                processing: true,
                error: {}
            };
        case actionTypes.transactionConstants.FETCH_TRANSACTIONS_FAILURE:
            return {
                ...state,
                processing: false,
                transactions: null,
                error: action.error
            };
        case actionTypes.transactionConstants.FETCH_TRANSACTIONS_SUCCESS:

            return {
                ...state,
                transactions: action.transactions,
                processing: false,
                error: null
            };
        default:
            return state;
    }
}

export default transactionReducer








