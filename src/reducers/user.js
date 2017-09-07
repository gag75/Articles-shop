import {
    USER_LOGIN,
    USER_LOGIN_HASH_SUCCESS,
    USER_LOGIN_HASH_FAIL,
    USER_NEW_NAME,
    USER_LOGOUT
} from '../constants/User'

const initialState = {
    hash: '',
    render: false,
    type: 0,
    name: '',
    email: '',
    fullName: ''
}

export default function commonstate(state = initialState, action) {
    switch (action.type) {
        case USER_LOGIN:
            return {
                ...state,
                hash: action.payload.hash,
                type: action.payload.type,
                name: action.payload.name,
                email: action.payload.email,
                fullName: action.payload.fullName
            }
        case USER_LOGIN_HASH_SUCCESS:
            return {
                ...state,
                render: true,
                hash: action.payload.hash,
                type: action.payload.type,
                name: action.payload.name,
                email: action.payload.email,
                fullName: action.payload.fullName
            }
        case USER_NEW_NAME:
            return {
                ...state,
                name: action.payload.name,
            }
        case USER_LOGIN_HASH_FAIL:
            return {
                ...state,
                ...initialState,
                render: true,
            }
        case USER_LOGOUT:
            return {
                ...state,
                ...initialState,
                render: true,
            }
        default:
            return state
    }
}