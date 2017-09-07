import fetch from 'isomorphic-fetch'
import { validName, validFullName, validPass, validEmail, } from './../helpers/valid'
import {
    FORM_REGISTRATION_REQUEST,
    FORM_REGISTRATION_NAME,
    FORM_REGISTRATION_FULLNAME,
    FORM_REGISTRATION_PASS,
    FORM_REGISTRATION_EMAIL,
    FORM_REGISTRATION_FAIL,
    FORM_REGISTRATION_SUCCESS,
    FORM_REGISTRATION_DEINIT,
} from '../constants/FormRegistration'

export function deinitFormRegistration() {
    return {
        type: FORM_REGISTRATION_DEINIT
    }
}

export function existenceName(payload) {
    let name = payload.name;
    let errorName = validName(name);

    if (errorName == '') {
        return (dispatch) => {
            fetch('/user/existenceName', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name
                })
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                if (data.status == 'OK') {
                    dispatch({
                        type: FORM_REGISTRATION_NAME,
                        payload: {
                            errorName,
                            error: ''
                        }
                    });
                } else {
                    errorName = data.error.errorName;

                    dispatch({
                        type: FORM_REGISTRATION_NAME,
                        payload: {
                            errorName,
                            error: ''
                        }
                    });
                }
            })
            .catch(function() {
                dispatch({
                    type: FORM_REGISTRATION_NAME,
                    payload: {
                        error: 'Ошибка попробуйте позже!',
                        errorName
                    }
                });
            });
        }
    } else {
        return {
            type: FORM_REGISTRATION_NAME,
            payload: {
                errorName,
                error: ''

            }
        }
    }
}

export function validationFullName(payload) {
    let fullName = payload.fullName;
    let errorFullName = validFullName(fullName);

    if (errorFullName == '') {
        return {
            type: FORM_REGISTRATION_FULLNAME,
            payload: {
                errorFullName
            }
        }
    } else {
        return {
            type: FORM_REGISTRATION_FULLNAME,
            payload: {
                errorFullName
            }
        }
    }
}

export function validationPass(payload) {
    let pass = payload.pass;
    let errorPass = validPass(pass);

    if (errorPass == '') {
        return {
            type: FORM_REGISTRATION_PASS,
            payload: {
                errorPass
            }
        }
    } else {
        return {
            type: FORM_REGISTRATION_PASS,
            payload: {
                errorPass
            }
        }
    }
}

export function existenceEmail(payload) {
    let email = payload.email;
    let errorEmail = validEmail(email);

    if (errorEmail == '') {
        return (dispatch) => {
            fetch('/user/existenceEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email
                })
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                if (data.status == 'OK') {
                    dispatch({
                        type: FORM_REGISTRATION_EMAIL,
                        payload: {
                            errorEmail,
                            error: ''
                        }
                    });
                } else {
                    errorEmail = data.error.errorEmail;

                    dispatch({
                        type: FORM_REGISTRATION_EMAIL,
                        payload: {
                            errorEmail,
                            error: ''
                        }
                    });
                }
            })
            .catch(function() {
                dispatch({
                    type: FORM_REGISTRATION_EMAIL,
                    payload: {
                        error: 'Ошибка попробуйте позже!',
                        errorEmail
                    }
                });
            });
        }
    } else {
        return {
            type: FORM_REGISTRATION_EMAIL,
            payload: {
                errorEmail,
                error: ''
            }
        }
    }
}

export function registrationRequest(payload) {

    let userLogin = payload.userLogin;

    let error = '';

    let name = payload.name;
    let errorName = validName(name);
    let fullName = payload.fullName;
    let errorFullName = validFullName(fullName);
    let pass = payload.pass;
    let errorPass = validPass(pass);
    let email = payload.email;
    let errorEmail = validEmail(email);

    if (errorName == '' && errorFullName == '' && errorPass == '' && errorEmail == '') {
        return (dispatch) => {
            dispatch({
                type: FORM_REGISTRATION_REQUEST
            })

            fetch('/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    fullName,
                    pass,
                    email
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
                            type: FORM_REGISTRATION_SUCCESS,
                        });
                    }, 300);
                    
                } else {
                    errorName = data.error.errorName || '';
                    errorFullName = data.error.errorFullName || '';
                    errorPass = data.error.errorPass || '';
                    errorEmail = data.error.errorEmail || '';
                    error = data.error.error || '';

                    dispatch({
                        type: FORM_REGISTRATION_FAIL,
                        payload: {
                            name,
                            fullName,
                            email,
                            errorName,
                            errorFullName,
                            errorPass,
                            errorEmail,
                            error
                        }
                    });
                }
            })
            .catch(function() {
                dispatch({
                    type: FORM_REGISTRATION_FAIL,
                    payload: {
                        name,
                        fullName,
                        email,
                        errorName,
                        errorFullName,
                        errorPass,
                        errorEmail,
                        error: 'Ошибка попробуйте позже!'
                    }
                });
            });
        }
    } else {
        return {
            type: FORM_REGISTRATION_FAIL,
            payload: {
                name,
                fullName,
                email,
                errorName,
                errorFullName,
                errorPass,
                errorEmail,
                error
            }
        }
    }
}