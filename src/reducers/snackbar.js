import {
    SNACKBAR_OPEN,
    SNACKBAR_CLOSE
} from '../constants/Snackbar'

const initialState = {
    open: false,
    text: ''
}

export default function commonstate(state = initialState, action) {
    switch (action.type) {
        case SNACKBAR_OPEN:
            return {
                ...state,
                open: true,
                text: action.payload.text,
            }
        case SNACKBAR_CLOSE:
            return {
                ...state,
                ...initialState
            }
        default:
            return state
    }
}