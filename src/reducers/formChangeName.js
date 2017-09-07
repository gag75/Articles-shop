import {
    FORM_CHANGE_NAME_REQUEST,
    FORM_CHANGE_NAME_NAME,
    FORM_CHANGE_NAME_FAIL,
    FORM_CHANGE_NAME_SUCCESS,
    FORM_CHANGE_NAME_DEINIT,
} from '../constants/FormChangeName'

const initialState = {
    request: false,
    name: '',
    errorName: '',
    error: '',
}

export default function commonstate(state = initialState, action) {
    switch (action.type) {
        case FORM_CHANGE_NAME_REQUEST:
            return {...state, request: true}
        case FORM_CHANGE_NAME_NAME:
            return {
                ...state,
                errorName: action.payload.errorName,
                error: ''
            }
        case FORM_CHANGE_NAME_FAIL:
            return {
                ...state,
                request: false,
                name: action.payload.name,
                errorName: action.payload.errorName,
                error: action.payload.error,
            }
        case FORM_CHANGE_NAME_SUCCESS:
        case FORM_CHANGE_NAME_DEINIT:
            return {...state, ...initialState}
        default:
            return state
    }
}