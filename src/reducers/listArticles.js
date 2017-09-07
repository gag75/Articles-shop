import {
    LIST_ARTICLES_INIT,
    LIST_ARTICLES_NEXT,
    LIST_ARTICLES_SORT,
    LIST_ARTICLES_CNANGE
} from '../constants/ListArticles.js'

const initialState = {
    articles:[],
    nextId:-1,
    nextPrice:-1,
    nextDate:-1,
    sort: 0,
    state: 1
}

export default function commonstate(state = initialState, action) {
    switch (action.type) {
        case LIST_ARTICLES_INIT:
            return {
                ...state,
                articles: action.payload.articles,
                nextId: action.payload.nextId,
                nextPrice: action.payload.nextPrice,
                nextDate: action.payload.nextDate,
                state: action.payload.state
            }
        case LIST_ARTICLES_NEXT:
            return {
                ...state,
                articles: [
                    ...state.articles,
                    ...action.payload.articles
                ],
                nextId: action.payload.nextId,
                nextPrice: action.payload.nextPrice,
                nextDate: action.payload.nextDate,
                state: action.payload.state
            }
        case LIST_ARTICLES_CNANGE:
            return{
                  ...state,
                articles: [
                    ...state.articles
                ],
            }
        case LIST_ARTICLES_SORT:
            return{
                ...state,
                sort: action.payload.sort
            }
        default:
            return state
    }
}