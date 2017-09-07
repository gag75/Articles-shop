import {
    MY_ARTICLES_INIT,
    MY_ARTICLES_NEXT,
} from '../constants/MyArticles'

const initialState = {
    articles:[
        /*{
            id: 1,
            title: 'Моя купленная Статья',
            someText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.',
            timeLife: new Date(),
            categoriesId:'technics',
            url:'/article/TEST4',
            status: 2 //(0-истёк срок или отказал админ, 1-в ожидании, 2-куплена)
        },
        {
            id: 2,
            title: 'Статья в Ожидании',
            someText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.',
            timeLife: new Date(),
            categoriesId:'animals',
            url:'/article/TEST5',
            status: 1 //(0-истёк срок или отказал админ, 1-в ожидании, 2-куплена)
        }*/
    ],
    nextId:-1,
    state: 2
}

export default function commonstate(state = initialState, action) {
    switch (action.type) {
        case MY_ARTICLES_INIT:
            return {
                ...state,
                articles: action.payload.articles,
                nextId: action.payload.nextId,
            }
        case MY_ARTICLES_NEXT:
            return {
                ...state,
                articles: [
                    ...state.articles,
                    ...action.payload.articles
                ],
                nextId: action.payload.nextId
            }
        default:
            return state
    }
}