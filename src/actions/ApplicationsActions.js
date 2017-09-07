import fetch from 'isomorphic-fetch'
import {
    APPLICATIONS_INIT,
    APPLICATIONS_DEINIT,
    APPLICATIONS_NEXT,
    APPLICATIONS_UPDATE
} from '../constants/ApplicationsForAdmin'
import {
    SNACKBAR_OPEN
} from '../constants/Snackbar'


export function deInitApplications() {
    return {
        type: APPLICATIONS_DEINIT
    }
}

export function initApplications(payload) {
    let hash = payload.hash;
    let nextId = payload.nextId || null;

    return (dispatch) => {
        fetch('/articles/showListAdmin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                hash,
                nextId
            })
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if (data.status == 'OK') {
                dispatch({
                    type: APPLICATIONS_INIT,
                    payload: {
                        applications: data.articles,
                        nextId: data.nextId
                    }
                });
                
            } else {
                dispatch({
                    type: APPLICATIONS_INIT,
                    payload: {
                        applications: [],
                        nextId: -1
                    }
                });
            }
        })
        .catch(function() {
            dispatch({
                type: APPLICATIONS_INIT,
                payload : {
                    applications: []
                }
            });
        });
    }
}


export function nextApplications(payload) {
    let hash = payload.hash || null;
    let nextId = payload.nextId || -1;
    return (dispatch) => {
        fetch('/articles/showListAdmin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nextId,
                hash
            })
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if (data.status == 'OK') {
                dispatch({
                    type: APPLICATIONS_NEXT,
                    payload: {
                        applications: data.articles,
                        nextId: data.nextId,
                    }
                });
            } else {
                dispatch({
                    type: APPLICATIONS_NEXT,
                    payload: {
                        applications: [],
                        nextId: -1,
                    }
                });
            }
        })
    }
}

export function confirmApplication(payload) {
    let id = payload.id;
    let hash = payload.hash || null;
    let applications = payload.applications || null;

    return (dispatch) => {
        fetch('/basket/articleAdminOk', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id,
                hash
            })
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if (data.status == 'OK') {
                dispatch({
                    type: SNACKBAR_OPEN,
                    payload: {
                        text: 'Заказ подтверждён'
                    }
                });
                if(applications){
                    let newApplications = [...applications];
                    let j=0;
                    for (let i=0; i< newApplications.length;i++){
                        if(newApplications[i].id==id){
                            j=i;
                            break;
                        }
                    }
                    newApplications.splice(j,1);
                    dispatch({
                        type: APPLICATIONS_UPDATE,
                        payload: {
                            applications: newApplications
                        }
                    });
                }
            } else {
                let error = data.error.error || '';
                dispatch({
                    type: SNACKBAR_OPEN,
                    payload: {
                        text: error
                    }
                });
            }
        })
        .catch(function() {
            dispatch({
                type: SNACKBAR_OPEN,
                payload : {
                    text: 'Неизвестная ошибка попробуйте позже!'
                }
            });
        });
    }
}

export function rejectApplication(payload) {
    let id = payload.id;
    let hash = payload.hash || null;
    let applications = payload.applications || null;

    return (dispatch) => {
        fetch('/basket/articleAdminCancel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id,
                hash
            })
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if (data.status == 'OK') {
                dispatch({
                    type: SNACKBAR_OPEN,
                    payload: {
                        text: 'Заказ откланён'
                    }
                });
                if(applications){
                    let newApplications = [...applications];
                    let j=0;
                    for (let i=0; i< newApplications.length;i++){
                        if(newApplications[i].id==id){
                            j=i;
                            break;
                        }
                    }
                    newApplications.splice(j,1);
                    dispatch({
                        type: APPLICATIONS_UPDATE,
                        payload: {
                            applications: newApplications
                        }
                    });
                }
            } else {
                let error = data.error.error || '';
                dispatch({
                    type: SNACKBAR_OPEN,
                    payload: {
                        text: error
                    }
                });
            }
        })
        .catch(function() {
            dispatch({
                type: SNACKBAR_OPEN,
                payload : {
                    text: 'Неизвестная ошибка попробуйте позже!'
                }
            });
        });
    }
}