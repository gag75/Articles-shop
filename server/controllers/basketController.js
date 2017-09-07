import * as User from './../models/user'
import * as Basket from './../models/basket'

export function buy(req, res) {
    let hash = req.body.hash;
    let idArticle = req.body.id;

    User.hasHash(hash, function(err, user) {
        if (err) {
            console.error(err);
            err = {
                error: 'Ошибка на сервере попробуте позже!'
            }
            res.status(500).json({'status':'error','error':err});
        } else if (user == 0) {
            err = {
                error: 'Ошибка доступа!'
            }
            res.status(200).json({'status':'error','error':err});
        } else {
            user = user[0] || null;
            let idUser = user.id || null;
            if (idUser) {
                Basket.buy(idUser, idArticle, function(err) {
                    if (err) {
                        console.error(err);
                        err = {
                            error: 'Ошибка на сервере попробуте позже!'
                        }
                        res.status(500).json({'status':'error','error':err});
                    } else {
                        res.status(200).json({'status':'OK'});
                    }
                })
            } else {
                res.status(500).json({'status':'error'});
            }
        }
    });
}

export function articleAdminOk(req, res) {
    let hash = req.body.hash || null;
    let id = req.body.id || null;

    User.existenceAdmin(hash, function(err, countHash) {
        if (err) {
            console.error(err);
            err = {
                error: 'Ошибка на сервере попробуте позже!'
            }
            res.status(500).json({'status':'error','error':err});
        } else if (countHash == 0) {
            err = {
                error: 'Ошибка доступа!'
            }
            res.status(200).json({'status':'error','error':err});
        } else {
            Basket.articleAdminOk(id, function(err) {
                if (err) {
                    console.error(err);
                    err = {
                        error: 'Ошибка на сервере попробуте позже!'
                    }
                    res.status(500).json({'status':'error','error':err});
                } else {
                    res.status(200).json({'status':'OK'});
                }
            })
        };
    });
}

export function articleAdminCancel(req, res) {
    let hash = req.body.hash || null;
    let id = req.body.id || null;

    User.existenceAdmin(hash, function(err, countHash) {
        if (err) {
            console.error(err);
            err = {
                error: 'Ошибка на сервере попробуте позже!'
            }
            res.status(500).json({'status':'error','error':err});
        } else if (countHash == 0) {
            err = {
                error: 'Ошибка доступа!'
            }
            res.status(200).json({'status':'error','error':err});
        } else {
            Basket.articleAdminCancel(id, function(err) {
                if (err) {
                    console.error(err);
                    err = {
                        error: 'Ошибка на сервере попробуте позже!'
                    }
                    res.status(500).json({'status':'error','error':err});
                } else {
                    res.status(200).json({'status':'OK'});
                }
            })
        };
    });
}