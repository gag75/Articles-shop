import fetch from 'isomorphic-fetch'
import { validPass } from './../helpers/valid'
import {
    FORM_RESET_PASS_NEW_REQUEST,
    FORM_RESET_PASS_NEW_HASH,
    FORM_RESET_PASS_NEW_PASS,
    FORM_RESET_PASS_NEW_FAIL,
    FORM_RESET_PASS_NEW_SUCCESS,
    FORM_RESET_PASS_NEW_DEINIT,
} from '../constants/FormResetPassNew'

export function deinitFormResetPassNew() {
    return {
        type: FORM_RESET_PASS_NEW_DEINIT
    }
}

export function setHash(payload) {
    return {
        type: FORM_RESET_PASS_NEW_HASH,
        payload: {
            hash: payload.hash
        }
    }
}

export function validationPass(payload) {
    let pass = payload.pass;
    let errorPass = validPass(pass);

    if (errorPass == '') {
        return {
            type: FORM_RESET_PASS_NEW_PASS,
            payload: {
                errorPass
            }
        }
    } else {
        return {
            type: FORM_RESET_PASS_NEW_PASS,
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
                type: FORM_RESET_PASS_NEW_REQUEST
            })

            fetch('/user/setNewPassByHash', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    pass,
                    hash
                })
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                if (data.status == 'OK') {
                    closeDialog();

                    dispatch({
                        type: FORM_RESET_PASS_NEW_SUCCESS,
                    });

                } else {
                    errorPass = data.error.errorPass || '';
                    console.log(data.error);
                    dispatch({
                        type: FORM_RESET_PASS_NEW_FAIL,
                        payload: {
                            error: '',
                            errorPass,
                            pass
                        }
                    });
                }
            })
            .catch(function() {
                dispatch({
                    type: FORM_RESET_PASS_NEW_FAIL,
                    payload: {
                        error: 'Ошибка попробуйте позже!',
                        errorPass: '',
                        pass
                    }
                });
            });
        }
    } else {
        return {
            type: FORM_RESET_PASS_NEW_FAIL,
            payload: {
                error: '',
                errorPass,
                pass
            }
        }
    }
}