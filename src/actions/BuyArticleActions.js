import fetch from 'isomorphic-fetch'
import {
    SNACKBAR_OPEN
} from '../constants/Snackbar'

import {
    LIST_ARTICLES_CNANGE
} from '../constants/ListArticles'

import {
    ARTICLE_UPDATE
} from '../constants/Article'

export function buyArticle(payload) {
    let hash = payload.hash;
    let idArticle = payload.idArticle;
    let articles = payload.articles || null;
    return (dispatch) => {
        fetch('/basket/buy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                hash,
                id:idArticle
            })
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if (data.status == 'OK') {
                dispatch({
                    type: SNACKBAR_OPEN,
                    payload: {
                        text: 'Заявка на покупку статьи отправлена!'
                    }
                });
                dispatch({
                    type: ARTICLE_UPDATE
                });
                if(articles){
                    for(let i=0; i<articles.length; i++){
                        if(idArticle==articles[i].id){
                            articles[i].buy = 2;            
                        }
                    }
                    dispatch({
                        type: LIST_ARTICLES_CNANGE,
                        payload: {
                            articles
                        }
                    });
                }
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