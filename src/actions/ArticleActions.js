import fetch from 'isomorphic-fetch'
import {
    ARTICLE_INIT,
    ARTICLE_DEINIT,
} from '../constants/Article'



export function deInitArticle() {
    return {
        type: ARTICLE_DEINIT
    }
}

export function initArticle(payload) {
    let hash = payload.hashUser
    let url = payload.url || '-1';

    return (dispatch) => {
        fetch('/articles/item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url,
                hash
            })
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if (data.status == 'OK') {
                dispatch({
                    type: ARTICLE_INIT,
                    payload: {
                        article: data.article
                    }
                });
                
            } else {
                dispatch({
                    type: ARTICLE_INIT,
                    payload: {
                        article: {}
                    }
                });
            }
        })
        .catch(function() {
            dispatch({
                type: ARTICLE_INIT,
                payload : {
                    article: {}
                }
            });
        });
    }
}
