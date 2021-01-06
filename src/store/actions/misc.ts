/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Dispatch } from 'redux';

import { MiscActionTypes, miscConstants } from './actionTypes';
import { Bank } from '../types';

import APIServices from '../../services/api-services';
import APIServiceError from '../../services/error-services';

const API = new APIServices();

export function getBanks() {
  function success(banks: Array<Bank>): MiscActionTypes {
    return {
      type: miscConstants.FETCH_BANKS_SUCCESS,
      banks,
    };
  }

  return async (dispatch: Dispatch) => {
    try {
      const data = await API.getBanks();
      await dispatch(success(data.data.banks));
    } catch (error) {
      if (error instanceof APIServiceError) {
        throw error.response.data;
      }
    }
  };
}
