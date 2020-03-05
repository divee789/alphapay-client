import { Dispatch } from 'redux'

import * as actionTypes from './actionTypes';
import { Transaction } from '../types'

import APIRequest from '../../services/api-services';
import APIServiceError from '../../services/error-services';

const BaseURL = process.env.REACT_APP_SERVER_URL;
const Request = new APIRequest(BaseURL);


// export function get_client_transactions() {
//     function request() {
//         return { type: actionTypes.walletConstants.FETCH_TRANSACTION_REQUEST }
//     }
//     function success(transactions:[Transaction]) {
//         return { type: actionTypes.walletConstants.FETCH_TRANSACTION_SUCCESS, transactions }
//     }
//     function failure(errors: any) {
//         return { type: actionTypes.walletConstants.FETCH_TRANSACTION_FAILURE, errors }
//     }

//     return async (dispatch: Dispatch) => {
//         try {
//             await dispatch(request())
//             const transactions = await Request.getTransactions()
//             console.log('action_transaction', transactions)
//             dispatch(success(transactions.transactions))
//         } catch (error) {
//             if (error instanceof APIServiceError) {
//                 console.log('error in getting wallet', error);
//                 dispatch(failure(error));
//                 throw error.response.data;
//             }
//         }
//     }
// }

