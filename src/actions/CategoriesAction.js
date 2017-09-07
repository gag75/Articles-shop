import fetch from 'isomorphic-fetch'
import {
    CATEGORIES_INIT,
    CATEGORIES_SELECT,
    CATEGORIES_NEW_STATE,
/*    CATEGORIES_UPDATE*/
} from '../constants/Categories'

export function selectActive(payload){
    return {
            type: CATEGORIES_SELECT,
            payload
        }
}

export function initCategories(payload){
    let hash = payload.hash || null;
    let state = payload.state || 1;
    return (dispatch) => {
        fetch('/categories/show', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
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
                    type: CATEGORIES_INIT,
                    payload: {
                        categories: data.categories
                    }
                });
            } else {
                dispatch({
                    type: CATEGORIES_INIT,
                    payload: {
                        categories: []
                    }
                });
            }
        })
    }
}

export function newState(payload){
     return {
            type: CATEGORIES_NEW_STATE,
            payload
        }
}

/*export function updateCategorie(payload){
    return {
            type: CATEGORIES_UPDATE,
            payload
        }
}*/
/*export function existenceCityOne(payload) {
    let cityOne = payload.cityOne;
    let cityTwo = payload.cityTwo;

    if (cityOne != cityTwo) {
        return (dispatch) => {
            fetch('/flight/existenceCityOne', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    city: cityOne
                })
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                if (data.status == 'OK') {
                    dispatch({
                        type: FORM_SEARCH_CITY_ONE,
                        payload: {
                            cityOne,
                            errorCityOne: '',
                            listCityOne: data.list
                        }
                    });
                } else {
                    let errorCityOne = data.error.errorCity;

                    dispatch({
                        type: FORM_SEARCH_CITY_ONE,
                        payload: {
                            cityOne,
                            errorCityOne,
                            listCityOne: []
                        }
                    });
                }
            })
            .catch(function() {
                dispatch({
                    type: FORM_SEARCH_CITY_ONE,
                    payload: {
                        cityOne,
                        errorCityOne: '',
                        listCityOne: []

                    }
                });
            });
        }
    } else {
        return {
            type: FORM_SEARCH_CITY_ONE,
            payload: {
                cityOne,
                errorCityOne: 'Вы уже в этом городе!',
                listCityOne: []
            }
        }
    }
}

export function existenceCityTwo(payload) {
    let cityOne = payload.cityOne;
    let cityTwo = payload.cityTwo;

    if (cityOne != cityTwo) {
        return (dispatch) => {
            fetch('/flight/existenceCityTwo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    city: cityTwo
                })
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                if (data.status == 'OK') {
                    dispatch({
                        type: FORM_SEARCH_CITY_TWO,
                        payload: {
                            cityTwo,
                            errorCityTwo: '',
                            listCityTwo: data.list
                        }
                    });
                } else {
                    let errorCityTwo = data.error.errorCity;

                    dispatch({
                        type: FORM_SEARCH_CITY_TWO,
                        payload: {
                            cityTwo,
                            errorCityTwo,
                            listCityTwo: []
                        }
                    });
                }
            })
            .catch(function() {
                dispatch({
                    type: FORM_SEARCH_CITY_TWO,
                    payload: {
                        cityTwo,
                        errorCityTwo: '',
                        listCityTwo: []
                    }
                });
            });
        }
    } else {
        return {
            type: FORM_SEARCH_CITY_TWO,
            payload: {
                cityTwo,
                errorCityTwo: 'Вы уже в этом городе!',
                listCityTwo: []
            }
        }
    }
}

export function existenceDate(payload) {
    let date = payload.date.toISOString().replace(/T/, ' ').replace(/\..+/, '').split(' ')[0].split('-');
    if (payload.date.getDate() != date[2]) {
        date = `${date[0]}-${date[1]}-${payload.date.getDate()}`;
    } else {
        date = `${date[0]}-${date[1]}-${date[2]}`;
    }

    return {
        type: FORM_SEARCH_DATE,
        payload: {
            date
        }
    }
}

export function existenceSort(payload) {
    let sort = payload.sort;

    return {
        type: FORM_SEARCH_SORT,
        payload: {
            sort
        }
    }
}

export function searchRequest(payload) {
    
    let cityOne = payload.cityOne;
    let cityTwo = payload.cityTwo;
    let date = payload.date;
    let sort= payload.sort

    let initList = payload.initList

    return (dispatch) => {
        dispatch({
            type: FORM_SEARCH_REQUEST
        })

        fetch('/flight/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cityOne,
                cityTwo,
                date,
                sort
            })
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if (data.status == 'OK') {
                let nextHash = data.nextHash || '-1';
                initList({list:data.list,nextHash});

                dispatch({
                    type: FORM_SEARCH_SUCCESS,
                });
                
            } else {
                dispatch({
                    type: FORM_SEARCH_FAIL,
                });
            }
        })
        .catch(function() {
            dispatch({
                type: FORM_SEARCH_FAIL,
            });
        });
    }
}*/