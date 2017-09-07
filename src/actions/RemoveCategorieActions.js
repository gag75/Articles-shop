import fetch from 'isomorphic-fetch'

export function removeCategorieRequest(payload) {
    let idRemoveCategorie = payload.id;
    let hash = payload.hash;
    let initCategories =  payload.initCategories;

    return (dispatch) => {
        fetch('/categories/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id:idRemoveCategorie,
                hash
            })
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if (data.status == 'OK') {
                initCategories({});
            } else {
                /*let error = data.error.error || '';*/
            }
        })
        .catch(function() {
            dispatch({
                type: 'ERROR',
                payload: {
                    error: 'Неизвестная ошибка!'
                }
            });
        });
    }
}