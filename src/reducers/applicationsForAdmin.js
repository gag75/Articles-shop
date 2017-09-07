import {
    APPLICATIONS_INIT,
    APPLICATIONS_DEINIT,
    APPLICATIONS_NEXT,
    APPLICATIONS_UPDATE
} from '../constants/ApplicationsForAdmin'

const initialState = {
    applications:[],
    nextId: -1,
}

export default function commonstate(state = initialState, action) {
    switch (action.type) {
        case APPLICATIONS_INIT:
            return {
                ...state,
                applications: action.payload.applications,
                nextId: action.payload.nextId}
         case APPLICATIONS_NEXT:
            return {
                ...state,
                applications: [
                    ...state.applications,
                    ...action.payload.applications
                ],
                nextId: action.payload.nextId}
        case APPLICATIONS_UPDATE:
            return {
                ...state,
                applications: [
                    ...action.payload.applications
                ]}
        case APPLICATIONS_DEINIT:
            return {...state, ...initialState}
        default:
            return state
    }
}