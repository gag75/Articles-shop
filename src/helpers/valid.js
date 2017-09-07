export function validName(name) {
    if (name.length < 4) {
        return 'Логин должен быть длинее 3 символов!'
    } else if (name.length > 29) {
        return 'Логин должен быть кароче 30 символов!'
    } else if (/[^a-zA-Z0-9_]/.test(name)) {
        return 'Логин может состоять только из a-z, A-Z, 0-9 или _'
    } else {
        return ''
    }
}

 export function validFullName(fullName) {
    if (fullName.length == 0) {
        return 'ФИО не должно быть пустым!'
    } else {
        return ''
    }
}

export function validPass(pass) {
    if (pass.length < 6) {
        return 'Пароль должен быть длинее 6 символов!'
    } else if (pass.length > 29) {
        return 'Пароль должен быть кароче 30 символов!'
    } else {
        return ''
    }
}

export function validEmail(email) {
    if (!/^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u.test(email)) {
        return 'Email имеет неверный формат!'
    } else {
        return ''
    }
}

export function validHash(hash) {
    if (hash.length != 64) {
        return 'Неправильный код!'
    } else {
       return ''
    }
}