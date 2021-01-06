import { beneficiaryConstants, BeneficiaryActionTypes } from '../actions/actionTypes';
import { BeneficiaryReducer } from '../interfaces';

const initialState: BeneficiaryReducer = {
  beneficiaries: [],
};

const beneficiaryReducer = (state = initialState, action: BeneficiaryActionTypes): BeneficiaryReducer => {
  switch (action.type) {
    case beneficiaryConstants.FETCH_BENEFICIARIES_SUCCESS:
      return {
        ...state,
        beneficiaries: action.beneficiaries,
      };
    default:
      return state;
  }
};

export default beneficiaryReducer;
