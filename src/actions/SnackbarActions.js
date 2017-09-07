import {
    SNACKBAR_CLOSE
} from '../constants/Snackbar'

export function closeSnackbar() {
    return {
        type: SNACKBAR_CLOSE
    }
}