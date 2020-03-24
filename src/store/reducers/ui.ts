
import * as actionTypes from '../actions/actionTypes'


const initialState = {
    mode: ''
}

const UIReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.uiConstants.SWITCH_MODE_LIGHT:
            return {
                mode: 'light'
            };
        case actionTypes.uiConstants.SWITCH_MODE_DARK:
            return {
                mode: 'dark'
            }
        default:
            return state;
    }
}

export default UIReducer








