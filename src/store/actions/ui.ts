import * as actionTypes from './actionTypes';
import { Dispatch } from 'redux'



export function switch_mode(mode: string) {
    function dark_background() {
        return {
            type: actionTypes.uiConstants.SWITCH_MODE_DARK
        }
    }
    function light_background() {
        return {
            type: actionTypes.uiConstants.SWITCH_MODE_LIGHT
        }
    }

    return async (dispatch: Dispatch) => {
        switch (mode) {
            case 'light':
                return dispatch(light_background())
            case 'dark':
                return dispatch(dark_background())
            default:
                return dispatch(light_background())
        }
    }
}

