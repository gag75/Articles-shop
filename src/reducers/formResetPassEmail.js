import {
    FORM_RESET_PASS_EMAIL_REQUEST,
    FORM_RESET_PASS_EMAIL_EMAIL,
    FORM_RESET_PASS_EMAIL_FAIL,
    FORM_RESET_PASS_EMAIL_SUCCESS,
    FORM_RESET_PASS_EMAIL_DEINIT,
} from '../constants/FormResetPassEmail'

const initialState = {
    request: false,
    email: '',
    errorEmail: '',
    error: '',
}

export default function commonstate(state = initialState, action) {
    switch (action.type) {
        case FORM_RESET_PASS_EMAIL_REQUEST:
            return {...state, request: true}
        case FORM_RESET_PASS_EMAIL_EMAIL:
            return {
                ...state,
                errorEmail: action.payload.errorEmail,
                error: ''
            }
        case FORM_RESET_PASS_EMAIL_FAIL:
            return {
                ...state,
                request: false,
                email: action.payload.email,
                errorEmail: action.payload.errorEmail,
                error: action.payload.error,
            }
        case FORM_RESET_PASS_EMAIL_SUCCESS:
        case FORM_RESET_PASS_EMAIL_DEINIT:
            return {...state, ...initialState}
        default:
            return state
    }
}