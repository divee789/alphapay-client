/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Dispatch } from 'redux';
import { BeneficiaryActionTypes, beneficiaryConstants } from './actionTypes';
import APIServices from '../../services/api-services';
import { Beneficiary } from '../types';

const API = new APIServices();

export function getBeneficiaries() {
  function success(beneficiaries: Array<Beneficiary>): BeneficiaryActionTypes {
    return {
      type: beneficiaryConstants.FETCH_BENEFICIARIES_SUCCESS,
      beneficiaries,
    };
  }

  return async (dispatch: Dispatch) => {
    try {
      const data = await API.getBeneficiaries();
      await dispatch(success(data.data.beneficiaries));
    } catch (error) {
      throw error.response.data;
    }
  };
}
