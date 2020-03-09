
import * as actionTypes from '../actions/actionTypes'


const initialState = {
    wallet: null,
    processing: false,
    error: null,
    fund_processing: false
}

const walletReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.walletConstants.FETCH_WALLET_REQUEST:
            return {
                ...state,
                processing: true,
                error: null
            };
        case actionTypes.walletConstants.FETCH_WALLET_FAILURE:
            return {
                ...state,
                processing: false,
                wallet: null,
                error: action.errors.response.data
            };
        case actionTypes.walletConstants.FETCH_WALLET_SUCCESS:
            return {
                ...state,
                wallet: action.wallet,
                processing: false,
                error: null
            };
        case actionTypes.walletConstants.FUND_WALLET_REQUEST:
            return {
                ...state,
                fund_processing: true,
                error: null
            };
        case actionTypes.walletConstants.FUND_WALLET_FAILURE:
            return {
                ...state,
                fund_processing: false,
                wallet: null,
                error: action.errors.response.data
            };
        case actionTypes.walletConstants.FUND_WALLET_SUCCESS:
            return {
                ...state,
                wallet: action.wallet,
                fund_processing: false,
                error: null
            };
        default:
            return state;
    }
}

export default walletReducer








