import {
    FORM_NEW_CATEGORIE_FAIL,
    FORM_NEW_CATEGORIE_INIT,
    FORM_NEW_CATEGORIE_DEINIT,
} from '../constants/FormNewCategorie'

const initialState = {
    error:'',
    categorie: {}
}

export default function commonstate(state = initialState, action) {
    switch (action.type) {
        case FORM_NEW_CATEGORIE_INIT:
            return {
                ...state,
                categorie: action.payload.categorie,
            }
        case FORM_NEW_CATEGORIE_FAIL:
            return {
                ...state,
                error: action.payload.error
            }
        case FORM_NEW_CATEGORIE_DEINIT:
            return {...state, ...initialState}
        default:
            return state
    }
}