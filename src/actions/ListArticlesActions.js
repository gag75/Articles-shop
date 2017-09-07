import fetch from 'isomorphic-fetch'
import {
    LIST_ARTICLES_INIT,
    LIST_ARTICLES_NEXT,
    LIST_ARTICLES_SORT
} from '../constants/ListArticles'

export function initList(payload) {
    //каждый раз подзагружаем
    let categories_id = payload.categorie || null;// какую категорию 
    let sort = payload.sort || 0;//тип сортировки 
    let state = payload.state || 1;//1 -все статьи по умолч , 2-купленные, 3 - статьи в ожидании
    let hash = payload.hash || null;//user.hash
    return (dispatch) => {
        fetch('/articles/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                categories_id,
                sort,
                state,
                hash
            })
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            if (data.status == 'OK') {
                dispatch({
                    type: LIST_ARTICLES_INIT,
                    payload: {
                        articles: data.articles,
                        nextId: data.nextId,
                        nextPrice: data.nextPrice,
                        nextDate: data.nextDate,
                        state: state
                    }
                });
            } else {
                dispatch({
                    type: LIST_ARTICLES_INIT,
                    payload: {
                        articles: [],
                        nextId: -1,
                        nextPrice: -1,
                        nextDate: -1,
                        state: 1
                    }
                });
            }
        })
    }
}

export function nextList(payload) {
    let categories_id=payload.categorie || null;
    let sort=payload.sort || 0;
    let nextId=payload.nextId;
    let nextDate=payload.nextDate;
    let nextPrice=payload.nextPrice;
    let state=payload.state || 1;
    let hash = payload.hash || null;
    return (dispatch) => {
        fetch('/articles/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                categories_id,
                sort,
                nextId,
                nextDate,
                nextPrice,
                state,
                hash
            })
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if (data.status == 'OK') {
                dispatch({
                    type: LIST_ARTICLES_NEXT,
                    payload: {
                        articles: data.articles,
                        nextId: data.nextId,
                        nextPrice: data.nextPrice,
                        nextDate: data.nextDate,
                        state: state
                    }
                });
            } else {
                dispatch({
                    type: LIST_ARTICLES_NEXT,
                    payload: {
                        articles: [],
                        nextId: -1,
                        nextPrice: -1,
                        nextDate: -1,
                        state: 1
                    }
                });
            }
        })
    }
}

export function sortSelect(payload){
  return{
    type: LIST_ARTICLES_SORT,
    payload:{
      sort:payload.sort
    }
  }
}