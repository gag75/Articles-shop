import {
    DIALOG_OPEN,
    DIALOG_CLOSE
} from '../constants/Dialog'

export function openDialog(payload) {
    return {
        type: DIALOG_OPEN,
        payload
    }
}

export function closeDialog() {
    return {
        type: DIALOG_CLOSE
    }
}