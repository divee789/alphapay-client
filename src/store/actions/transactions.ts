import { Dispatch } from 'redux'

import * as actionTypes from './actionTypes';
import { Transaction } from '../types'

import APIRequest from '../../services/api-services';
import APIServiceError from '../../services/error-services';

const BaseURL = process.env.REACT_APP_SERVER_URL;
const Request = new APIRequest(BaseURL);


export function get_client_transactions(page?: number) {
    function request() {
        return { type: actionTypes.transactionConstants.FETCH_TRANSACTIONS_REQUEST }
    }
    function success(transactions: [Transaction], pager) {
        console.log(transactions)
        const data = {
            transactions,
            pager
        }
        return { type: actionTypes.transactionConstants.FETCH_TRANSACTIONS_SUCCESS, data }
    }
    function failure(error: any) {
        return { type: actionTypes.transactionConstants.FETCH_TRANSACTIONS_FAILURE, error }
    }

    return async (dispatch: Dispatch) => {
        try {
            await dispatch(request())
            const transactions = await Request.getTransactions(page)
            console.log('action_transaction', transactions)
            dispatch(success(transactions.transactions, transactions.pager))
        } catch (error) {
            console.log(error)
            if (error instanceof APIServiceError) {
                console.log('error in getting transaction', error);
                dispatch(failure(error));
                throw error.response.data;
            }
        }
    }
}



export function filter_client_transactions(data: any, page?: number) {
    function request() {
        return { type: actionTypes.transactionConstants.FETCH_TRANSACTIONS_REQUEST }
    }
    function success(transactions: [Transaction], pager) {
        console.log(transactions)
        const data = {
            transactions,
            pager
        }
        return { type: actionTypes.transactionConstants.FETCH_TRANSACTIONS_SUCCESS, data }
    }
    function failure(error: any) {
        return { type: actionTypes.transactionConstants.FETCH_TRANSACTIONS_FAILURE, error }
    }

    return async (dispatch: Dispatch) => {
        try {
            await dispatch(request())
            const transactions = await Request.filterTransactions(data, page)
            console.log('action_transaction', transactions)
            dispatch(success(transactions.transactions, transactions.pager))
        } catch (error) {
            console.log(error)
            if (error instanceof APIServiceError) {
                console.log('error in getting transaction', error);
                dispatch(failure(error));
                throw error.response.data;
            }
        }
    }
}