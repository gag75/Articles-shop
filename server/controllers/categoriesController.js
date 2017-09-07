import * as User from './../models/user'
import * as Categories from './../models/categories'
import * as Articles from './../models/articles'
import * as Basket from './../models/basket'

export function show(req, res) {
    let state = req.body.state || 1;
    let hash = req.body.hash || null;

    if (state == 1) {
        Categories.show(function(err, categories) {
            if (err) {
                console.error(err);
                err = {
                    error: 'Ошибка на сервере попробуте позже!'
                }
                res.status(500).json({'status':'error','error':err});
            } else {
                res.status(200).json({'status':'OK',categories});
            }
        })
    } else {
        User.hasHash(hash, function(err, user) {
            if (err) {
                console.error(err);
                err = {
                    error: 'Ошибка на сервере попробуте позже!'
                }
                res.status(500).json({'status':'error','error':err});
            } else if (user.length == 0) {
                err = {
                    error: 'Ошибка доступа!'
                }
                res.status(200).json({'status':'error','error':err});
            } else {
                Basket.getIdArticles(user[0].id, state-1, function(err, articles_id) {
                    if (err) {
                        console.error(err);
                        err = {
                            error: 'Ошибка на сервере попробуте позже!'
                        }
                        res.status(500).json({'status':'error','error':err});
                    } else {
                        Articles.getArticlesById(articles_id, function(err, categories) {
                            if (err) {
                                console.error(err);
                                err = {
                                    error: 'Ошибка на сервере попробуте позже!'
                                }
                                res.status(500).json({'status':'error','error':err});
                            } else {
                                Categories.showById(categories, function(err, categories) {
                                    if (err) {
                                        console.error(err);
                                        err = {
                                            error: 'Ошибка на сервере попробуте позже!'
                                        }
                                        res.status(500).json({'status':'error','error':err});
                                    } else {
                                        res.status(200).json({'status':'OK',categories});
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }
}

export function create(req, res) {
    let hash = req.body.hash;
    let name = req.body.name;

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
            Categories.create(name, function(err) {
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
        }
    });
}

export function update(req, res) {
    let hash = req.body.hash;
    let name = req.body.name;
    let id = req.body.id;

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
            Categories.update(name, id, function(err) {
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
        }
    });
}

export function deleteCategories(req, res) {
    let hash = req.body.hash;
    let id = req.body.id;

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
            Articles.deleteByCategories(id, function(err) {
                if (err) {
                    console.error(err);
                    err = {
                        error: 'Ошибка на сервере попробуте позже!'
                    }
                    res.status(500).json({'status':'error','error':err});
                } else {
                    Categories.deleteCategories(id, function(err) {
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
                }
            })
        }
    });
}