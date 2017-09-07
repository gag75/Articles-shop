import {
    FORM_RESET_PASS_HASH_REQUEST,
    FORM_RESET_PASS_HASH_HASH,
    FORM_RESET_PASS_HASH_FAIL,
    FORM_RESET_PASS_HASH_SUCCESS,
    FORM_RESET_PASS_HASH_DEINIT,
} from '../constants/FormResetPassHash'

const initialState = {
    request: false,
    hash: '',
    errorHash: '',
    error: '',
}

export default function commonstate(state = initialState, action) {
    switch (action.type) {
        case FORM_RESET_PASS_HASH_REQUEST:
            return {...state, request: true}
        case FORM_RESET_PASS_HASH_HASH:
            return {
                ...state,
                errorHash: action.payload.errorHash,
                error: ''
            }
        case FORM_RESET_PASS_HASH_FAIL:
            return {
                ...state,
                request: false,
                hash: action.payload.hash,
                errorHash: action.payload.errorHash,
                error: action.payload.error,
            }
        case FORM_RESET_PASS_HASH_SUCCESS:
        case FORM_RESET_PASS_HASH_DEINIT:
            return {...state, ...initialState}
        default:
            return state
    }
}