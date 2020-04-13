import * as actionTypes from '../actions/actionTypes';

const initialState = {
  mode: localStorage.getItem('mode'),
  checked: false,
};

const UIReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.uiConstants.SWITCH_MODE_LIGHT:
      return {
        mode: 'light',
        checked: false,
      };
    case actionTypes.uiConstants.SWITCH_MODE_DARK:
      return {
        mode: 'dark',
        checked: true,
      };
    default:
      return state;
  }
};

export default UIReducer;
