import {
    FORM_ADD_CATEGORIE_FAIL,
    FORM_ADD_CATEGORIE_DEINIT
} from '../constants/FormAddCategorie'

const initialState = {
    error:''
}

export default function commonstate(state = initialState, action) {
    switch (action.type) {
        case FORM_ADD_CATEGORIE_FAIL:
            return {
                ...state,
                error: action.payload.error
            }
        case FORM_ADD_CATEGORIE_DEINIT:
            return {...state, ...initialState}
        default:
            return state
    }
}