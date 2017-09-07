import {
    CATEGORIES_REQUEST,
    CATEGORIES_INIT,
    CATEGORIES_ADD,
    CATEGORIES_SELECT,
    CATEGORIES_FAIL,
    CATEGORIES_SUCCESS
} from '../constants/Categories'

const initialState = {
    request: false,
    categories: [],
    activeCategorie: null,
}

export default function commonstate(state = initialState, action) {
    switch (action.type) {
        case CATEGORIES_REQUEST:
            return {...state, request: true}
        case CATEGORIES_INIT:
            return {
                ...state,
                categories: action.payload.categories
            }
        case CATEGORIES_ADD:
            return {
                ...state,
                categories: {
                    ...state.categories,
                    ...action.payload.categories
                },
            }
        case CATEGORIES_SELECT:
            return {
                ...state,
                activeCategorie: action.payload.activeCategorie,
            }
        case CATEGORIES_FAIL:
        case CATEGORIES_SUCCESS:
            return {
                ...state,
                request: false,
            }
        default:
            return state
    }
}