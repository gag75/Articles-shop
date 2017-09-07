import {
    FORM_RESET_PASS_NEW_REQUEST,
    FORM_RESET_PASS_NEW_HASH,
    FORM_RESET_PASS_NEW_PASS,
    FORM_RESET_PASS_NEW_FAIL,
    FORM_RESET_PASS_NEW_SUCCESS,
    FORM_RESET_PASS_NEW_DEINIT,
} from '../constants/FormResetPassNew'

const initialState = {
    request: false,
    hash: '',
    errorPass: '',
    error: '',
}

export default function commonstate(state = initialState, action) {
    switch (action.type) {
        case FORM_RESET_PASS_NEW_REQUEST:
            return {...state, request: true}
        case FORM_RESET_PASS_NEW_PASS:
            return {
                ...state,
                errorPass: action.payload.errorPass,
                error: ''
            }
        case FORM_RESET_PASS_NEW_HASH:
            return {
                ...state,
                hash: action.payload.hash
            }
        case FORM_RESET_PASS_NEW_FAIL:
            return {
                ...state,
                request: false,
                errorPass: action.payload.errorPass,
                error: action.payload.error,
            }
        case FORM_RESET_PASS_NEW_SUCCESS:
        case FORM_RESET_PASS_NEW_DEINIT:
            return {...state, ...initialState}
        default:
            return state
    }
}