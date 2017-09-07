import fetch from 'isomorphic-fetch'
import { validHash } from './../helpers/valid'
import {
    FORM_RESET_PASS_HASH_REQUEST,
    FORM_RESET_PASS_HASH_HASH,
    FORM_RESET_PASS_HASH_FAIL,
    FORM_RESET_PASS_HASH_SUCCESS,
    FORM_RESET_PASS_HASH_DEINIT,
} from '../constants/FormResetPassHash'

export function deinitFormResetPassHash() {
    return {
        type: FORM_RESET_PASS_HASH_DEINIT
    }
}

export function validationHash(payload) {
    let hash = payload.hash;
    let errorHash = validHash(hash);

    if (errorHash == '') {
        return {
            type: FORM_RESET_PASS_HASH_HASH,
            payload: {
                errorHash
            }
        }
    } else {
        return {
            type: FORM_RESET_PASS_HASH_HASH,
            payload: {
                errorHash
            }
        }
    }
}

export function hashRequest(payload) {
    let openDialog = payload.openDialog;
    let setHash = payload.setHash;

    let hash = payload.hash;
    let errorHash = validHash(hash);

    if (errorHash == '') {
        return (dispatch) => {
            dispatch({
                type: FORM_RESET_PASS_HASH_REQUEST
            })

            fetch('/user/hasHashResetPass', {
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
                    setHash({hash});
                    openDialog({name:'FormResetPassNew'});
                    dispatch({
                        type: FORM_RESET_PASS_HASH_SUCCESS,
                    });
                } else {
                    let errorHash = data.error.errorHash || '';

                    dispatch({
                        type: FORM_RESET_PASS_HASH_FAIL,
                        payload: {
                            error: '',
                            errorHash,
                            hash
                        }
                    });
                }
            })
            .catch(function() {
                dispatch({
                    type: FORM_RESET_PASS_HASH_FAIL,
                    payload: {
                        error: 'Ошибка попробуйте позже!',
                        errorHash: '',
                        hash
                    }
                });
            });
        }
    } else {
        return {
            type: FORM_RESET_PASS_HASH_FAIL,
            payload: {
                error: '',
                errorHash,
                hash
            }
        }
    }
}