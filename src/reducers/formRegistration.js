import {
    FORM_REGISTRATION_REQUEST,
    FORM_REGISTRATION_NAME,
    FORM_REGISTRATION_FULLNAME,
    FORM_REGISTRATION_PASS,
    FORM_REGISTRATION_EMAIL,
    FORM_REGISTRATION_FAIL,
    FORM_REGISTRATION_SUCCESS,
    FORM_REGISTRATION_DEINIT,
} from '../constants/FormRegistration'

const initialState = {
    request: false,
    name: '',
    fullName: '',
    email: '',
    errorName: '',
    errorFullName: '',
    errorPass: '',
    errorEmail: '',
    error: ''
}

export default function commonstate(state = initialState, action) {
    switch (action.type) {
        case FORM_REGISTRATION_REQUEST:
            return {...state, request: true}
        case FORM_REGISTRATION_FAIL:
            return {
                ...state,
                request: false,
                name: action.payload.name,
                fullName: action.payload.fullName,
                email: action.payload.email,
                errorName: action.payload.errorName,
                errorFullName: action.payload.errorFullName,
                errorPass: action.payload.errorPass,
                errorEmail: action.payload.errorEmail,
                error: action.payload.error,
            }
        case FORM_REGISTRATION_NAME:
            return {
                ...state,
                errorName: action.payload.errorName,
                error: action.payload.error
            }
        case FORM_REGISTRATION_FULLNAME:
            return {
                ...state,
                errorFullName: action.payload.errorFullName,
            }
        case FORM_REGISTRATION_PASS:
            return {
                ...state,
                errorPass: action.payload.errorPass,
            }
        case FORM_REGISTRATION_EMAIL:
            return {
                ...state,
                errorEmail: action.payload.errorEmail,
                error: action.payload.error
            }
        case FORM_REGISTRATION_SUCCESS:
        case FORM_REGISTRATION_DEINIT:
            return {...state, ...initialState}
        default:
            return state
    }
}