/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as actionTypes from './actionTypes';
import { Dispatch } from 'redux';

export function switchMode(mode: string) {
  function darkBackground() {
    return {
      type: actionTypes.uiConstants.SWITCH_MODE_DARK,
    };
  }
  function lightBackground() {
    return {
      type: actionTypes.uiConstants.SWITCH_MODE_LIGHT,
    };
  }

  return async (dispatch: Dispatch) => {
    switch (mode) {
      case 'light':
        return dispatch(lightBackground());
      case 'dark':
        return dispatch(darkBackground());
      default:
        return dispatch(lightBackground());
    }
  };
}
