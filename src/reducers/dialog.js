import {
    DIALOG_OPEN,
    DIALOG_CLOSE
} from '../constants/Dialog'

const initialState = {
    open: false,
    name: ''
}

export default function commonstate(state = initialState, action) {
    switch (action.type) {
        case DIALOG_OPEN:
            return {
                ...state,
                open: true,
                name: action.payload.name,
            }
        case DIALOG_CLOSE:
            return {
                ...state,
                open: false,
                name: '',
            }
        default:
            return state
    }
}