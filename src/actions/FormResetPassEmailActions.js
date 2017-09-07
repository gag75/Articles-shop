import fetch from 'isomorphic-fetch'
import { validEmail } from './../helpers/valid'
import {
    FORM_RESET_PASS_EMAIL_REQUEST,
    FORM_RESET_PASS_EMAIL_EMAIL,
    FORM_RESET_PASS_EMAIL_FAIL,
    FORM_RESET_PASS_EMAIL_SUCCESS,
    FORM_RESET_PASS_EMAIL_DEINIT,
} from '../constants/FormResetPassEmail'

export function deinitFormResetPassEmail() {
    return {
        type: FORM_RESET_PASS_EMAIL_DEINIT
    }
}

export function validationEmail(payload) {
    let email = payload.email;
    let errorEmail = validEmail(email);

    if (errorEmail == '') {
        return {
            type: FORM_RESET_PASS_EMAIL_EMAIL,
            payload: {
                errorEmail
            }
        }
    } else {
        return {
            type: FORM_RESET_PASS_EMAIL_EMAIL,
            payload: {
                errorEmail
            }
        }
    }
}

export function emailRequest(payload) {
    let openDialog = payload.openDialog;

    let email = payload.email;
    let errorEmail = validEmail(email);

    if (errorEmail == '') {
        return (dispatch) => {
            dispatch({
                type: FORM_RESET_PASS_EMAIL_REQUEST
            })

            fetch('/user/setHashResetPass', {
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
                    openDialog({name:'FormResetPassHash'});

                    dispatch({
                        type: FORM_RESET_PASS_EMAIL_SUCCESS,
                    });

                } else {
                    errorEmail = data.error.errorEmail || '';

                    dispatch({
                        type: FORM_RESET_PASS_EMAIL_FAIL,
                        payload: {
                            error: '',
                            errorEmail,
                            email
                        }
                    });
                }
            })
            .catch(function() {
                dispatch({
                    type: FORM_RESET_PASS_EMAIL_FAIL,
                    payload: {
                        error: 'Ошибка попробуйте позже!',
                        errorEmail: '',
                        email
                    }
                });
            });
        }
    } else {
        return {
            type: FORM_RESET_PASS_EMAIL_FAIL,
            payload: {
                error: '',
                errorEmail,
                email
            }
        }
    }
}