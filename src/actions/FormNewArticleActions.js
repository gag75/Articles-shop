/*import fetch from 'isomorphic-fetch'*/
import {
    FORM_NEW_ARTICLE_FAIL,
    FORM_NEW_ARTICLE_DEINIT
} from '../constants/FormNewArticle'

import {
    SNACKBAR_OPEN
} from '../constants/Snackbar'

export function deinitFormFlight() {
    return {
        type: FORM_NEW_ARTICLE_DEINIT
    }
}

export function addRequest(payload) {
    let hash = payload.hash;
    let title = payload.title;
    let text = payload.text;
    let date = payload.timeLife;
    let some_text =  payload.some_text;
    let categories_id = payload.categories;
    let price = payload.price;
    let sale = payload.sale;
    let img = payload.img || '';

    var imgError = img.search(/^.*\.(?:jpg|jpeg|mp3|mp4)\s*$/ig);
    if (title=='' || some_text=='' || text=='' || date=='' || categories_id==-1 || price=='' || sale=='' || img=='') {
        return {
            type: FORM_NEW_ARTICLE_FAIL,
            payload: {
                error: 'Все поля должны быть заполенены'
            }
        }
    }
    if(imgError!=0){
            return {
                type: FORM_NEW_ARTICLE_FAIL,
                payload: {
                    error: 'Не верный формат картинки'
                }
             }
    }
    return (dispatch) => {
        fetch('/articles/addArticle', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                hash,
                title,
                text,
                date,
                some_text,
                categories_id,
                price,
                sale,
                img
            })
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if (data.status == 'OK') {
                payload.callback();
                dispatch({
                    type: SNACKBAR_OPEN,
                    payload: {
                        text: 'Статья добавлена!'
                    }
                });
            } else {
                let error = data.error.error || '';
                dispatch({
                    type: SNACKBAR_OPEN,
                    payload: {
                        text: error
                    }
                });
            }
        })
        .catch(function() {
            dispatch({
                type: SNACKBAR_OPEN,
                payload : {
                    text: 'Неизвестная ошибка попробуйте позже!'
                }
            });
        });
    }
}