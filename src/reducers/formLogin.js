import {
    FORM_LOGIN_REQUEST,
    FORM_LOGIN_NAME,
    FORM_LOGIN_PASS,
    FORM_LOGIN_FAIL,
    FORM_LOGIN_SUCCESS,
    FORM_LOGIN_DEINIT,
} from '../constants/FormLogin'

const initialState = {
    request: false,
    name: '',
    errorName: '',
    errorPass: '',
    error: ''
}

export default function commonstate(state = initialState, action) {
    switch (action.type) {
        case FORM_LOGIN_REQUEST:
            return {...state, request: true}
        case FORM_LOGIN_FAIL:
            return {
                ...state,
                request: false,
                name: action.payload.name,
                errorName: action.payload.errorName,
                errorPass: action.payload.errorPass,
                error: action.payload.error
            }
        case FORM_LOGIN_NAME:
            return {
                ...state,
                errorName: action.payload.errorName,
                error: ''
            }
        case FORM_LOGIN_PASS:
            return {
                ...state,
                errorPass: action.payload.errorPass,
                error: ''
            }
        case FORM_LOGIN_SUCCESS:
        case FORM_LOGIN_DEINIT:
            return {...state, ...initialState}
        default:
            return state
    }
}