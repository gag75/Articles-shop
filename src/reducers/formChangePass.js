import {
    FORM_CHANGE_PASS_REQUEST,
    FORM_CHANGE_PASS_PASS,
    FORM_CHANGE_PASS_FAIL,
    FORM_CHANGE_PASS_SUCCESS,
    FORM_CHANGE_PASS_DEINIT,
} from '../constants/FormChangePass'

const initialState = {
    request: false,
    errorPass: '',
    error: '',
}

export default function commonstate(state = initialState, action) {
    switch (action.type) {
        case FORM_CHANGE_PASS_REQUEST:
            return {...state, request: true}
        case FORM_CHANGE_PASS_PASS:
            return {
                ...state,
                errorPass: action.payload.errorPass,
                error: ''
            }
        case FORM_CHANGE_PASS_FAIL:
            return {
                ...state,
                request: false,
                errorPass: action.payload.errorPass,
                error: action.payload.error,
            }
        case FORM_CHANGE_PASS_SUCCESS:
        case FORM_CHANGE_PASS_DEINIT:
            return {...state, ...initialState}
        default:
            return state
    }
}