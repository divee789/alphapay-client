import { MiscActionTypes, miscConstants } from '../actions/actionTypes';
import { MiscReducer } from '../interfaces';

const initialState: MiscReducer = {
  banks: [],
};

const miscReducer = (state = initialState, action: MiscActionTypes): MiscReducer => {
  switch (action.type) {
    case miscConstants.FETCH_BANKS_SUCCESS:
      return {
        ...state,
        banks: action.banks,
      };
    default:
      return state;
  }
};

export default miscReducer;
