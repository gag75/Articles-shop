import {
    DIALOG_CLOSE
} from '../constants/Dialog'

import {
    FORM_ADD_CATEGORIE_FAIL,
    FORM_ADD_CATEGORIE_DEINIT
} from '../constants/FormAddCategorie'


export function deinitForm() {
    return {
        type: FORM_ADD_CATEGORIE_DEINIT
    }
}
export function addCategorieRequest(payload) {
    let addNameCategorie = payload.categorieName;
    let hash = payload.hash;
    let initCategories =  payload.initCategories;

    if (addNameCategorie=='') {
        return {
            type: FORM_ADD_CATEGORIE_FAIL,
            payload: {
                error: 'Поле не должно быть пустым'
            }
        }
    }
    
    return (dispatch) => {
        fetch('/categories/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name:addNameCategorie,
                hash
            })
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if (data.status == 'OK') {
                dispatch({
                    type: DIALOG_CLOSE
                })
                initCategories({});
            } else {
                let error = data.error.error || '';
                dispatch({
                    type: FORM_ADD_CATEGORIE_FAIL,
                    payload: {
                        error: error
                    }
                })
            }
        })
        .catch(function() {
            dispatch({
                type: FORM_ADD_CATEGORIE_FAIL,
                payload: {
                    error: 'Неизвестная ошибка!'
                }
            });
        });
    }
}