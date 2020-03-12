import { Dispatch } from 'redux'

import * as actionTypes from './actionTypes';
import { Wallet } from '../types'

import APIRequest from '../../services/api-services';
import APIServiceError from '../../services/error-services';

const BaseURL = process.env.REACT_APP_STAGING
const Request = new APIRequest(BaseURL);


export function get_client_wallet() {
    function request() {
        return { type: actionTypes.walletConstants.FETCH_WALLET_REQUEST }
    }
    function success(wallet: Wallet) {
        return { type: actionTypes.walletConstants.FETCH_WALLET_SUCCESS, wallet }
    }
    function failure(errors: any) {
        return { type: actionTypes.walletConstants.FETCH_WALLET_FAILURE, errors }
    }

    return async (dispatch: Dispatch) => {
        try {
            await dispatch(request())
            const wallet = await Request.getWallet()
            console.log('action_wallet', wallet)
            dispatch(success(wallet.wallet))
        } catch (error) {
            if (error instanceof APIServiceError) {
                console.log('error in getting wallet', error);
                dispatch(failure(error));
                throw error.response.data;
            }
        }
    }
}

export function fund_client_wallet(data: {
    amount: number,
    narration: string,
    processor: string,
    processor_reference: string,
    transaction_status: string,
    transaction_pin: number
}) {
    function request() {
        return { type: actionTypes.walletConstants.FUND_WALLET_REQUEST }
    }
    function success(wallet: Wallet) {
        return { type: actionTypes.walletConstants.FUND_WALLET_SUCCESS, wallet }
    }
    function failure(errors: any) {
        return { type: actionTypes.walletConstants.FUND_WALLET_FAILURE, errors }
    }

    return async (dispatch: Dispatch) => {
        try {
            await dispatch(request())
            const wallet = await Request.fundWallet(data)
            console.log('fund_wallet', wallet.wallet)
            dispatch(success(wallet.wallet))
        } catch (error) {
            if (error instanceof APIServiceError) {
                console.log('error in getting wallet', error);
                dispatch(failure(error));
                throw error.response.data;
            }
        }
    }
}


