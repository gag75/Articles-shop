import {
    ROUTING
} from '../constants/Routing'

export function routing(payload) {
    return (dispatch) => {
        dispatch({
            type: ROUTING,
                payload: {
                method: payload.method,
                nextUrl: payload.url
            }
        });
    }
}