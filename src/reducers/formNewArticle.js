import {
    FORM_NEW_ARTICLE_FAIL,
    FORM_NEW_ARTICLE_DEINIT
} from '../constants/FormNewArticle'

const initialState = {
    error: ''
}

export default function commonstate(state = initialState, action) {
    switch (action.type) {
        case FORM_NEW_ARTICLE_FAIL:
            return {
                ...state,
                error: action.payload.error,
            }
        case FORM_NEW_ARTICLE_DEINIT:
            return {...state, ...initialState}
        default:
            return state
    }
}