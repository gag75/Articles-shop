import fetch from 'isomorphic-fetch'
import { validName } from './../helpers/valid'
import {
    FORM_CHANGE_NAME_REQUEST,
    FORM_CHANGE_NAME_NAME,
    FORM_CHANGE_NAME_FAIL,
    FORM_CHANGE_NAME_SUCCESS,
    FORM_CHANGE_NAME_DEINIT,
} from '../constants/FormChangeName'

export function deinitFormChangeName() {
    return {
        type: FORM_CHANGE_NAME_DEINIT
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
                        type: FORM_CHANGE_NAME_NAME,
                        payload: {
                            errorName,
                            error: ''
                        }
                    });
                } else {
                    errorName = data.error.errorName;
                    dispatch({
                        type: FORM_CHANGE_NAME_NAME,
                        payload: {
                            errorName,
                            error: ''
                        }
                    });
                }
            })
            .catch(function() {
                dispatch({
                    type: FORM_CHANGE_NAME_NAME,
                    payload: {
                        error: 'Ошибка попробуйте позже!',
                        errorName
                    }
                });
            });
        }
    } else {
        return {
            type: FORM_CHANGE_NAME_NAME,
            payload: {
                errorName,
                error: ''

            }
        }
    }
}

export function nameRequest(payload) {
    let closeDialog = payload.closeDialog;
    let newName = payload.newName;

    let name = payload.name;
    let errorName = validName(name);
    let hash = payload.hash;

    if (errorName == '') {
        return (dispatch) => {
            dispatch({
                type: FORM_CHANGE_NAME_REQUEST
            })

            fetch('/user/changeNameHash', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    hash,
                    name
                })
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                if (data.status == 'OK') {
                    newName({name});
                    closeDialog();

                    dispatch({
                        type: FORM_CHANGE_NAME_SUCCESS,
                    });

                } else {
                    errorName = data.error.errorName || '';

                    dispatch({
                        type: FORM_CHANGE_NAME_FAIL,
                        payload: {
                            name,
                            error: '',
                            errorName,
                        }
                    });
                }
            })
            .catch(function() {
                dispatch({
                    type: FORM_CHANGE_NAME_FAIL,
                    payload: {
                        name,
                        error: 'Ошибка попробуйте позже!',
                        errorName: '',
                    }
                });
            });
        }
    } else {
        return {
            type: FORM_CHANGE_NAME_FAIL,
            payload: {
                name,
                error: '',
                errorName,
            }
        }
    }
}