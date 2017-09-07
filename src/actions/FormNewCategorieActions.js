import {
    FORM_NEW_CATEGORIE_INIT,
    FORM_NEW_CATEGORIE_FAIL,
    FORM_NEW_CATEGORIE_DEINIT
} from '../constants/FormNewCategorie'


import {
    DIALOG_CLOSE
} from '../constants/Dialog'


export function deinitForm() {
    return {
        type: FORM_NEW_CATEGORIE_DEINIT
    }
}

export function initForm(payload) {
    return {
        type: FORM_NEW_CATEGORIE_INIT,
        payload: {
            categorie: payload.categorie
        }
    }
}

export function newCategorieRequest(payload) {
    let newNameCategorie = payload.categorie.categorie;
    if (newNameCategorie=='') {
        return {
            type: FORM_NEW_CATEGORIE_FAIL,
            payload: {
                error: 'Поле не должно быть пустым'
            }
        }
    }
    let hash = payload.hash;
    let id = payload.categorie.id;
    let initCategories =  payload.initCategories;
    return (dispatch) => {
        fetch('/categories/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                hash,
                name:newNameCategorie,
                id
            })
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if (data.status == 'OK') {
               initCategories({});
                dispatch({
                    type: DIALOG_CLOSE
                })
            } else {
                let error = data.error.error || '';
                dispatch({
                    type: FORM_NEW_CATEGORIE_FAIL,
                    payload: {
                        error: error
                    }
                })
            }
        })
        .catch(function() {
            dispatch({
                type: FORM_NEW_CATEGORIE_FAIL,
                payload: {
                    error: 'Неизвестная ошибка!'
                }
            });
        });
    }
}