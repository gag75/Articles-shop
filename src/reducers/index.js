import { combineReducers } from 'redux'
import formLogin from './formLogin'
import formRegistration from './formRegistration'
import formResetPassEmail from './formResetPassEmail'
import formResetPassHash from './formResetPassHash'
import formResetPassNew from './formResetPassNew'
import formChangePass from './formChangePass'
import formChangeName from './formChangeName'
import formNewArticle from './formNewArticle'
import formNewCategorie from './formNewCategorie'
import formAddCategorie from './formAddCategorie'

import applicationsForAdmin from './applicationsForAdmin'
import listArticles from './listArticles'
import categories from './categories'
import article from './article'
import myArticles from './myArticles'
import user from './user'
import dialog from './dialog'
import snackbar from './snackbar'

export const rootReducer = combineReducers({
    formLogin,
    formRegistration,
    formResetPassEmail,
    formResetPassHash,
    formResetPassNew,
    formChangePass,
    formChangeName,
    formNewArticle,
    formNewCategorie,
    formAddCategorie,
    listArticles,
    applicationsForAdmin,
    categories,
    article,
    myArticles,
    snackbar,
    user,
    dialog
})