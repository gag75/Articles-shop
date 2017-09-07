import fetch from 'isomorphic-fetch'
import { validName, validPass } from './../helpers/valid'
import {
    FORM_LOGIN_REQUEST,
    FORM_LOGIN_NAME,
    FORM_LOGIN_PASS,
    FORM_LOGIN_FAIL,
    FORM_LOGIN_SUCCESS,
    FORM_LOGIN_DEINIT,
} from '../constants/FormLogin'

export function deinitFormLogin() {
    return {
        type: FORM_LOGIN_DEINIT
    }
}

export function validationName(payload) {
    let name = payload.name;
    let errorName = validName(name);

    if (errorName == '') {
        return {
            type: FORM_LOGIN_NAME,
            payload: {
                errorName
            }
        }
    } else {
        return {
            type: FORM_LOGIN_NAME,
            payload: {
                errorName
            }
        }
    }
}

export function validationPass(payload) {
    let pass = payload.pass;
    let errorPass = validPass(pass);

    if (errorPass == '') {
        return {
            type: FORM_LOGIN_PASS,
            payload: {
                errorPass
            }
        }
    } else {
        return {
            type: FORM_LOGIN_PASS,
            payload: {
                errorPass
            }
        }
    }
}

export function loginRequest(payload) {
    
    let userLogin = payload.userLogin;

    let error = '';

    let name = payload.name;
    let errorName = validName(name);
    let pass = payload.pass;
    let errorPass = validPass(pass);

    if (errorName == '' && errorPass == '') {
        return (dispatch) => {
            dispatch({
                type: FORM_LOGIN_REQUEST
            })

            fetch('/user/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    pass
                })
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                if (data.status == 'OK') {

                    userLogin(data.user);
                    setTimeout(function() {
                        dispatch({
                            type: FORM_LOGIN_SUCCESS,
                        });
                    }, 300);
                    
                } else {
                    error = data.error.error || '';

                    dispatch({
                        type: FORM_LOGIN_FAIL,
                        payload: {
                            name,
                            errorName,
                            errorPass,
                            error
                        }
                    });
                }
            })
            .catch(function() {
                dispatch({
                    type: FORM_LOGIN_FAIL,
                    payload: {
                        name,
                        errorName,
                        errorPass,
                        error: 'Ошибка на сервере попробуйте позже!'
                    }
                });
            });
        }
    } else {
        return {
            type: FORM_LOGIN_FAIL,
            payload: {
                name,
                errorName,
                errorPass,
                error
            }
        }
    }
}