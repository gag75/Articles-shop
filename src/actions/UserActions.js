import fetch from 'isomorphic-fetch'
import {
    USER_LOGIN,
    USER_LOGIN_HASH_SUCCESS,
    USER_LOGIN_HASH_FAIL,
    USER_LOGOUT,
    USER_NEW_NAME,
} from '../constants/User'

import {
    ROUTING
} from '../constants/Routing'

export function userLogin(payload) {

    let date = new Date();
    date.setMonth(date.getMonth() + 1);
    document.cookie = `hash=${payload.hash}; expires=${date.toUTCString()}; path='/'`;
    
    return {
        type: USER_LOGIN,
        payload
    }
}


export function userLoginHash() {

    let hash = '';
    let hashIndex = document.cookie.indexOf('hash=');

    if (hashIndex != -1) {
        hash = document.cookie.slice(hashIndex + 5, hashIndex+70);
    }
    
    if (hash) {
        return (dispatch) => {
            fetch('/user/authHash', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    hash
                })
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                if (data.status == 'OK') {
                    dispatch({
                        type: USER_LOGIN_HASH_SUCCESS,
                        payload: {
                            ...data.user,
                            hash
                        }
                    });
                } else {
                    deleteCookie();
                    dispatch({
                        type: USER_LOGIN_HASH_FAIL,
                    });
                }
            })
            .catch(function() {
                deleteCookie();
                dispatch({
                    type: USER_LOGIN_HASH_FAIL,
                });
            });
        }
    } else {
        deleteCookie();
        return {
            type: USER_LOGIN_HASH_FAIL
        }
    }
}

function deleteCookie() {
    let date = new Date();
    date.setMonth(date.getMonth() - 1);
    document.cookie = `hash=;expires=${date.toUTCString()};path='/'`;
}

export function userLogout() {

    deleteCookie();

     return (dispatch) => {
        dispatch({
            type: ROUTING,
                payload: {
                method: 'replace',
                nextUrl: '/'
            }
        })
        dispatch( {
            type: USER_LOGOUT
        })
    }
  /*  return {
        type: USER_LOGOUT
    }*/
}

export function newName(payload) {
    return {
        type: USER_NEW_NAME,
        payload: {
            name: payload.name
        }
    }
}