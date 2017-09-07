import {
    ARTICLE_INIT,
    ARTICLE_DEINIT,
    ARTICLE_UPDATE
} from '../constants/Article'

const initialState = {
    article:{}
}

export default function commonstate(state = initialState, action) {
    switch (action.type) {
        case ARTICLE_INIT:
            return {
                ...state,
                article: action.payload.article,
            }
        case ARTICLE_DEINIT:
            return {
                ...state,
                ...initialState
            }
        case ARTICLE_UPDATE:{
            return{
                ...state,
                article: {
                    ...state.article,
                    buy: true
                }
            }
        }
        default:
            return state
    }
}