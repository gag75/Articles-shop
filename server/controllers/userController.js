import crypto from 'crypto'
import * as User from './../models/user'

export function create(req, res) {
    let name = req.body.name || null;
    let fullName = req.body.fullName || null;
    let pass = req.body.pass || null;
    let email = req.body.email || null;

    // validation
    
    pass = crypto.createHmac('sha256', '(QY*(hd9w').update(pass + 'sdf(@*09d3').digest('hex');

    let date = new Date();
    date.setHours(date.getHours() + 3);
    date = date.toISOString().replace(/T/, ' ').replace(/\..+/, '')

    let ip = req.connection.remoteAddress;
    ip = ip.substring(ip.lastIndexOf(':') + 1, ip.length);

    let data = {
        name,
        fullName,
        pass,
        email,
        ip,
        date
    };

    User.existenceName(data.name, function(err, countName) {
        if (err) {
            console.error(err);
            err = {
                error: 'Ошибка на сервере попробуте позже!'
            }
            res.status(500).json({'status':'error','error':err});
        } else if (countName != 0) {
            err = {
                errorName: 'Имя пользователя занято!',
            }
            res.status(200).json({'status':'error','error':err});
        } else {
            User.existenceEmail(data.email, function(err, countEmail) {
                if (err) {
                    console.error(err);
                    err = {
                        error: 'Ошибка на сервере попробуте позже!'
                    }
                    res.status(500).json({'status':'error','error':err});
                } else if (countEmail != 0) {
                    err = {
                        errorEmail: 'Пользователь с таким email уже существует!',
                    }
                    res.status(200).json({'status':'error','error':err});
                } else {
                    User.create(data, function(err, userId) {
                        if (err) {
                            console.error(err);
                            err = {
                                error: 'Ошибка на сервере попробуте позже!'
                            }
                            res.status(500).json({'status':'error','error':err});
                        } else {
                            let hash = crypto.createHmac('sha256', '(QY*(hd9w').update(new Date().getTime() + userId + 'sdf(@*09d3').digest('hex');
                            let type = 1;
                            User.setHashAuth({userId,hash}, function(err) {
                                if (err) {
                                    console.error(err);
                                    err = {
                                        error: 'Вы зарегистрированны произошла ошибка Авторизации! попробуте Авторизоваться позже!'
                                    }
                                    res.status(200).json({'status':'error','error':err});
                                } else {
                                    const user = {
                                        name,
                                        fullName,
                                        email,
                                        type,
                                        hash
                                    }
                                    res.status(200).json({'status':'OK',user});
                                }
                            });
                        }
                    });
                }
            });
        }
    });
}

export function auth(req, res) {
    let name = req.body.name || null;
    let pass = req.body.pass || null;

    // validation
    
    pass = crypto.createHmac('sha256', '(QY*(hd9w').update(pass + 'sdf(@*09d3').digest('hex');

    User.auth({name,pass}, function(err, user) {
        if (err) {
            console.error(err);
            err = {
                error: 'Ошибка на сервере попробуте позже!'
            }
            res.status(500).json({'status':'error','error':err});
        } else if (user.length == 0) {
            err = {
                error: 'Ошибка логин или пароль неправильные!'
            }
            res.status(200).json({'status':'error','error':err});
        } else {
            user = user[0];

            let hash = crypto.createHmac('sha256', '(QY*(hd9w').update(new Date().getTime() + user.id + 'sdf(@*09d3').digest('hex');
            let userId = user.id;
            let email = user.email;
            let fullName = user.fullName;
            let type = user.type;

            User.setHashAuth({userId,hash}, function(err) {
                if (err) {
                    console.error(err);
                    err = {
                        error: 'Ошибка на сервере попробуте позже!'
                    }
                    res.status(500).json({'status':'error','error':err});
                } else {
                    user = {
                        hash,
                        name,
                        type,
                        email,
                        fullName,
                    }
                    res.status(200).json({'status':'OK',user});
                }
            });
        }
    });
}

export function authHash(req, res) {
    let hash = req.body.hash || null;

    // validation

    User.authHash(hash, function(err, user) {
        if (err) {
            console.error(err);
            err = {
                error: 'Ошибка на сервере попробуте позже!'
            }
            res.status(500).json({'status':'error','error':err});
        } else if (user.length == 0) {
            res.status(200).json({'status':'error'});
        } else {
            user = user[0];

            let userId = user.id;
            let name = user.name;
            let email = user.email;
            let fullName = user.fullName;
            let type = user.type;

            user = {
                name,
                fullName,
                email,
                type,
            }

            res.status(200).json({'status':'OK',user});
        }
    });
}

export function existenceName(req, res) {
    let name = req.body.name || null;

    // validation

    User.existenceName(name, function(err, countName) {
        if (err) {
            console.error(err);
            err = {
                errorName: 'Ошибка на сервере попробуте позже!'
            }
            res.status(500).json({'status':'error','error':err});
        } else if (countName != 0) {
            err = {
                errorName: 'Имя пользователя занято!'
            }
            res.status(200).json({'status':'error','error':err});
        } else {
            res.status(200).json({'status':'OK'});
        }
    });
}

export function existenceEmail(req, res) {
    let email = req.body.email || null;

    // validation

    User.existenceEmail(email, function(err, countEmail) {
        if (err) {
            console.error(err);
            err = {
                errorEmail: 'Ошибка на сервере попробуте позже!'
            }
            res.status(500).json({'status':'error','error':err});
        } else if (countEmail != 0) {
            err = {
                errorEmail: 'Пользователь с таким email уже существует!'
            }
            res.status(200).json({'status':'error','error':err});
        } else {
            res.status(200).json({'status':'OK'});
        }
    });
}

export function setHashResetPass(req, res) {
    let email = req.body.email || null;

    // validation
    
    User.existenceEmail(email, function(err, countName) {
        if (err) {
            console.error(err);
            err = {
                errorEmail: 'Ошибка на сервере попробуте позже!'
            }
            res.status(500).json({'status':'error','error':err});
        } else if (countName == 0) {
            err = {
                errorEmail: 'Такого пользователя нет!'
            }
            res.status(200).json({'status':'error','error':err});
        } else {
            let hash = crypto.createHmac('sha256', '(QY*(hd9w').update(new Date().getTime() + 'sdf(@*09d3').digest('hex');

            User.setHashResetPass({email,hash}, function(err) {
                if (err) {
                    console.error(err);
                    err = {
                        errorEmail: 'Ошибка на сервере попробуте позже!'
                    }
                    res.status(500).json({'status':'error','error':err});
                } else {
                    res.status(200).json({'status':'OK'});
                }
            });
        }
    });
}

export function hasHashResetPass(req, res) {
    let hash = req.body.hash || null;

    // validation
    
    User.hasHashResetPass(hash, function(err, countHash) {
        if (err) {
            console.error(err);
            err = {
                error: 'Ошибка на сервере попробуте позже!'
            }
            res.status(500).json({'status':'error','error':err});
        } else if (countHash == 0) {
            err = {
                errorHash: 'Неправильный код!'
            }
            res.status(200).json({'status':'error','error':err});
        } else {
            res.status(200).json({'status':'OK'});
        }
    });
}

export function setNewPassByHash(req, res) {
    let hash = req.body.hash || null;
    let pass = req.body.pass || null;

    // validation
    
    pass = crypto.createHmac('sha256', '(QY*(hd9w').update(pass + 'sdf(@*09d3').digest('hex');
    
    User.hasHashResetPass(hash, function(err, countHash) {
        if (err) {
            console.error(err);
            err = {
                error: 'Ошибка на сервере попробуте позже!'
            }
            res.status(500).json({'status':'error','error':err});
        } else if (countHash == 0) {
            err = {
                errorHash: 'Ошибка неправильный hash!'
            }
            res.status(200).json({'status':'error','error':err});
        } else {
            User.setNewPassByHash({pass,hash}, function(err) {
                if (err) {
                    console.error(err);
                    err = {
                        error: 'Ошибка на сервере попробуте позже!'
                    }
                    res.status(500).json({'status':'error','error':err});
                } else {
                    res.status(200).json({'status':'OK'});
                }
            });
        }
    });
}

export function changePassHash(req, res) {
    let hash = req.body.hash || null;
    let pass = req.body.pass || null;

    // validation
    
    pass = crypto.createHmac('sha256', '(QY*(hd9w').update(pass + 'sdf(@*09d3').digest('hex');
    
    User.hasHashAuth(hash, function(err, countHash) {
        if (err) {
            console.error(err);
            err = {
                error: 'Ошибка на сервере попробуте позже!'
            }
            res.status(500).json({'status':'error','error':err});
        } else if (countHash == 0) {
            err = {
                errorHash: 'Ошибка неправильный hash!'
            }
            res.status(200).json({'status':'error','error':err});
        } else {
            User.changePassHash({pass,hash}, function(err) {
                if (err) {
                    console.error(err);
                    err = {
                        error: 'Ошибка на сервере попробуте позже!'
                    }
                    res.status(500).json({'status':'error','error':err});
                } else {
                    res.status(200).json({'status':'OK'});
                }
            });
        }
    });
}

export function changeNameHash(req, res) {
    let hash = req.body.hash || null;
    let name = req.body.name || null;

    // validation
    
    User.hasHashAuth(hash, function(err, countHash) {
        if (err) {
            console.error(err);
            err = {
                error: 'Ошибка на сервере попробуте позже!'
            }
            res.status(500).json({'status':'error','error':err});
        } else if (countHash == 0) {
            err = {
                errorHash: 'Ошибка неправильный hash!'
            }
            res.status(200).json({'status':'error','error':err});
        } else {
            User.existenceName(name, function(err, countName) {
                if (err) {
                    console.error(err);
                    err = {
                        error: 'Ошибка на сервере попробуте позже!'
                    }
                    res.status(500).json({'status':'error','error':err});
                } else if (countName != 0) {
                    err = {
                        errorName: 'Имя пользователя занято!',
                    }
                    res.status(200).json({'status':'error','error':err});
                } else {
                    User.changeNameHash({name,hash}, function(err) {
                        if (err) {
                            console.error(err);
                            err = {
                                error: 'Ошибка на сервере попробуте позже!'
                            }
                            res.status(500).json({'status':'error','error':err});
                        } else {
                            res.status(200).json({'status':'OK'});
                        }
                    });
                }
            });
        }
    });
}