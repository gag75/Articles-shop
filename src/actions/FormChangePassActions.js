import fetch from 'isomorphic-fetch'
import { validPass } from './../helpers/valid'
import {
    FORM_CHANGE_PASS_REQUEST,
    FORM_CHANGE_PASS_PASS,
    FORM_CHANGE_PASS_FAIL,
    FORM_CHANGE_PASS_SUCCESS,
    FORM_CHANGE_PASS_DEINIT,
} from '../constants/FormChangePass'

export function deinitFormChangePass() {
    return {
        type: FORM_CHANGE_PASS_DEINIT
    }
}

export function validationPass(payload) {
    let pass = payload.pass;
    let errorPass = validPass(pass);

    if (errorPass == '') {
        return {
            type: FORM_CHANGE_PASS_PASS,
            payload: {
                errorPass
            }
        }
    } else {
        return {
            type: FORM_CHANGE_PASS_PASS,
            payload: {
                errorPass
            }
        }
    }
}

export function passRequest(payload) {
    let closeDialog = payload.closeDialog;

    let pass = payload.pass;
    let errorPass = validPass(pass);
    let hash = payload.hash;

    if (errorPass == '') {
        return (dispatch) => {
            dispatch({
                type: FORM_CHANGE_PASS_REQUEST
            })

            fetch('/user/changePassHash', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    hash,
                    pass
                })
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                if (data.status == 'OK') {
                    closeDialog();

                    dispatch({
                        type: FORM_CHANGE_PASS_SUCCESS,
                    });

                } else {
                    errorPass = data.error.errorPass || '';

                    dispatch({
                        type: FORM_CHANGE_PASS_FAIL,
                        payload: {
                            error: '',
                            errorPass,
                        }
                    });
                }
            })
            .catch(function() {
                dispatch({
                    type: FORM_CHANGE_PASS_FAIL,
                    payload: {
                        error: 'Ошибка попробуйте позже!',
                        errorPass: '',
                    }
                });
            });
        }
    } else {
        return {
            type: FORM_CHANGE_PASS_FAIL,
            payload: {
                error: '',
                errorPass,
            }
        }
    }
}