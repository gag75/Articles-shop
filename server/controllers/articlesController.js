import * as Articles from './../models/articles'
import * as Categories from './../models/categories'
import * as User from './../models/user'
import * as Basket from './../models/basket'
import crypto from 'crypto'

export function search(req, res) {
    let categories_id = req.body.categories_id || null;
    let nextPrice = req.body.nextPrice || null;
    let nextId = req.body.nextId || null;
    let nextDate = req.body.nextDate || null;
    let sort = req.body.sort || 0;
    let state = req.body.state || 1;
    let hash = req.body.hash || null;

    function dateTrue(articles) {
        articles.forEach(article => {
            if (article.time_life != -1) {
                let date = article.time_life.toISOString().replace(/T/, ' ').replace(/\..+/, '').split(' ')[0].split('-');
                if (article.time_life.getDate() != date[2]) {
                    article.time_life = `${date[0]}-${date[1]}-${article.time_life.getDate()}`;
                } else {
                    article.time_life = `${date[0]}-${date[1]}-${date[2]}`;
                }
            }
        })
    }

    if (state == 1) {

        Articles.search({categories_id, nextPrice, nextId, nextDate, sort}, function(err, articles, nextPrice, nextId, nextDate) {
            if (err) {
                console.error(err);
                err = {
                    error: 'Ошибка на сервере попробуте позже!'
                }
                res.status(500).json({'status':'error','error':err});
            } else {
                dateTrue(articles);
                let arr = [{time_life:nextDate}];
                dateTrue(arr);
                nextDate = arr[0].time_life;
                articles.forEach(article => {
                    delete article.text;
                });
                let categories_id = [];
                articles.forEach(article => {
                    if (categories_id.indexOf(article.categories_id) == -1) {
                        categories_id.push(article.categories_id);
                    }
                });
                Categories.categoriesById(categories_id, (err, categories) => {
                    if (err) {
                        console.error(err);
                        err = {
                            error: 'Ошибка на сервере попробуте позже!'
                        }
                        res.status(500).json({'status':'error','error':err});
                    } else {
                        articles.forEach(article => {
                            article.categories = (function(id) {
                                for (let i = 0; i < categories.length; i++) {
                                    if (id == categories[i].id) {
                                        return categories[i].categories;
                                    }
                                }
                            })(article.categories_id);
                            delete article.categories_id;
                        })

                        if (hash) {
                            User.hasHash(hash, function(err, user) {
                                if (err) {
                                    console.error(err);
                                    err = {
                                        error: 'Ошибка на сервере попробуте позже!'
                                    }
                                    res.status(500).json({'status':'error','error':err});
                                } else {
                                    user = user[0] || null;
                                    let id = user.id || null;
                                    if (id) {
                                        Basket.getIdArticles(id, 1, function(err, articles_id) {
                                            if (err) {
                                                console.error(err);
                                                err = {
                                                    error: 'Ошибка на сервере попробуте позже!'
                                                }
                                                res.status(500).json({'status':'error','error':err});
                                            } else {
                                                articles_id = articles_id.map(article_id => {
                                                    return article_id.article_id;
                                                });

                                                Basket.getIdArticles(id, 2, function(err, articles2_id) {
                                                    if (err) {
                                                        console.error(err);
                                                        err = {
                                                            error: 'Ошибка на сервере попробуте позже!'
                                                        }
                                                        res.status(500).json({'status':'error','error':err});
                                                    } else {
                                                        articles2_id = articles2_id.map(article_id => {
                                                            return article_id.article_id;
                                                        });

                                                        articles.forEach(article => {
                                                            if (articles_id.indexOf(article.id) != -1) {
                                                                article.buy = 1;
                                                            } else {
                                                                if (articles2_id.indexOf(article.id) != -1) {
                                                                    article.buy = 2;
                                                                } else {
                                                                    article.buy = 0;
                                                                }
                                                            }
                                                        });
                                                        res.status(200).json({'status':'OK', articles, nextPrice, nextId, nextDate});
                                                    }
                                                });
                                            }
                                        });
                                    } else {
                                        res.status(200).json({'status':'OK', articles, nextPrice, nextId, nextDate});
                                    }
                                }
                            });
                        } else {
                            res.status(200).json({'status':'OK', articles, nextPrice, nextId, nextDate});
                        }
                    }
                })
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
                        Articles.getArticlesId(articles_id, categories_id, nextId, function(err, articles, nextPrice, nextId, nextDate) {
                            if (err) {
                                console.error(err);
                                err = {
                                    error: 'Ошибка на сервере попробуте позже!'
                                }
                                res.status(500).json({'status':'error','error':err});
                            } else {
                                dateTrue(articles);
                                let arr = [{time_life:nextDate}];
                                dateTrue(arr);
                                nextDate = arr[0].time_life;
                                articles.forEach(article => {
                                    delete article.text;
                                });
                                let categories_id = [];
                                articles.forEach(article => {
                                    if (categories_id.indexOf(article.categories_id) == -1) {
                                        categories_id.push(article.categories_id);
                                    }
                                });
                                Categories.categoriesById(categories_id, (err, categories) => {
                                    if (err) {
                                        console.error(err);
                                        err = {
                                            error: 'Ошибка на сервере попробуте позже!'
                                        }
                                        res.status(500).json({'status':'error','error':err});
                                    } else {
                                        articles.forEach(article => {
                                            article.categories = (function(id) {
                                                for (let i = 0; i < categories.length; i++) {
                                                    if (id == categories[i].id) {
                                                        return categories[i].categories;
                                                    }
                                                }
                                            })(article.categories_id);
                                            delete article.categories_id;
                                        })
                                        res.status(200).json({'status':'OK', articles, nextPrice, nextId, nextDate});
                                    }
                                })
                            }
                        });
                    }
                });
            }
        });
    }
}

export function item(req, res) {
    let url = req.body.url || null;
    let hash = req.body.hash || null;

    function dateTrue(articles) {
        articles.forEach(article => {
            if (article.time_life != -1) {
                let date = article.time_life.toISOString().replace(/T/, ' ').replace(/\..+/, '').split(' ')[0].split('-');
                if (article.time_life.getDate() != date[2]) {
                    article.time_life = `${date[0]}-${date[1]}-${article.time_life.getDate()}`;
                } else {
                    article.time_life = `${date[0]}-${date[1]}-${date[2]}`;
                }
            }
        })
    }

    Articles.item(url, function(err, article) {
        if (err) {
            console.error(err);
            err = {
                error: 'Ошибка на сервере попробуте позже!'
            }
            res.status(500).json({'status':'error','error':err});
        } else {
            dateTrue([article]);

            let categories_id = [article.categories_id];

            Categories.categoriesById(categories_id, (err, categories) => {
                if (err) {
                    console.error(err);
                    err = {
                        error: 'Ошибка на сервере попробуте позже!'
                    }
                    res.status(500).json({'status':'error','error':err});
                } else {
                    article.categories = categories[0].categories;

                    if (hash) {
                        User.hasHash(hash, function(err, user) {
                            if (err) {
                                console.error(err);
                                err = {
                                    error: 'Ошибка на сервере попробуте позже!'
                                }
                                res.status(500).json({'status':'error','error':err});
                            } else {
                                user = user[0] || null;
                                let id = user.id || null;
                                if (id) {
                                    Basket.getIdArticles(id, 2, function(err, articles_id) {
                                        if (err) {
                                            console.error(err);
                                            err = {
                                                error: 'Ошибка на сервере попробуте позже!'
                                            }
                                            res.status(500).json({'status':'error','error':err});
                                        } else {
                                            articles_id = articles_id.map(article_id => {
                                                return article_id.article_id;
                                            });

                                            Basket.getIdArticles(id, 1, function(err, articles2_id) {
                                                if (err) {
                                                    console.error(err);
                                                    err = {
                                                        error: 'Ошибка на сервере попробуте позже!'
                                                    }
                                                    res.status(500).json({'status':'error','error':err});
                                                } else {
                                                    articles2_id = articles2_id.map(article_id => {
                                                        return article_id.article_id;
                                                    });

                                                    articles_id = [...articles_id, ...articles2_id];

                                                    if(articles2_id.indexOf(article.id) == -1) {
                                                        delete article.text;
                                                    }

                                                    if (articles_id.indexOf(article.id) != -1) {
                                                        article.buy = true;
                                                    } else {
                                                        article.buy = false;
                                                    }
                                                    res.status(200).json({'status':'OK', article});
                                                }
                                            });
                                        }
                                    });
                                } else {
                                    delete article.text;
                                    article.buy = false;
                                    res.status(200).json({'status':'OK', article});
                                }
                            }
                        });
                    } else {
                        delete article.text;
                        article.buy = false;
                        res.status(200).json({'status':'OK', article});
                    }
                }
            });
        }
    });
}

export function showListAdmin(req, res) {
    let hash = req.body.hash || null;
    let nextId = req.body.nextId || null;

    function dateTrue(articles) {
        articles.forEach(article => {
            if (article.time_life != -1) {
                let date = article.time_life;//.toISOString().replace(/T/, ' ').replace(/\..+/, '').split(' ')[0].split('-');
                if (article.time_life.getDate() != date[2]) {
                    article.time_life = `${date[0]}-${date[1]}-${article.time_life.getDate()}`;
                } else {
                    article.time_life = `${date[0]}-${date[1]}-${date[2]}`;
                }
            }
        })
    }

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
            Basket.getArticles(nextId, function(err, articles_id, nextId) {
                if (err) {
                    console.error(err);
                    err = {
                        error: 'Ошибка на сервере попробуте позже!'
                    }
                    res.status(500).json({'status':'error','error':err});
                } else {
                    if (articles_id.length != 0) {
                        Articles.showListAdmin(articles_id, (err, articles) => {
                            dateTrue(articles);
                            let categories_id = [];
                            articles.forEach(article => {
                                if (categories_id.indexOf(article.categories_id) == -1) {
                                    categories_id.push(article.categories_id);
                                }
                            });
                            Categories.categoriesById(categories_id, (err, categories) => {
                                if (err) {
                                    console.error(err);
                                    err = {
                                        error: 'Ошибка на сервере попробуте позже!'
                                    }
                                    res.status(500).json({'status':'error','error':err});
                                } else {
                                    articles.forEach(article => {
                                        article.categories = (function(id) {
                                            for (let i = 0; i < categories.length; i++) {
                                                if (id == categories[i].id) {
                                                    return categories[i].categories;
                                                }
                                            }
                                        })(article.categories_id);
                                        delete article.categories_id;
                                    });
                                    let users_id = [];
                                    articles.forEach(article => {
                                        if (users_id.indexOf(article.user_id) == -1) {
                                            users_id.push(article.user_id);
                                        }
                                    });
                                    User.usersById(users_id, (err, users) => {
                                        if (err) {
                                            console.error(err);
                                            err = {
                                                error: 'Ошибка на сервере попробуте позже!'
                                            }
                                            res.status(500).json({'status':'error','error':err});
                                        } else {
                                            articles.forEach(article => {
                                                article.user = (function(id) {
                                                    for (let i = 0; i < users.length; i++) {
                                                        if (id == users[i].id) {
                                                            return users[i].name;
                                                        }
                                                    }
                                                })(article.user_id);
                                                delete article.user_id;
                                                delete article.article_id;
                                                delete article.text;
                                            });
                                            res.status(200).json({'status':'OK', articles, nextId});
                                        }
                                    })
                                }
                            });
                        });
                    } else {
                        res.status(200).json({'status':'OK', articles: [], nextId:-1});
                    }
                }
            });
        };
    });
}

export function addArticle(req, res) {
    let data = {};
    let hash = req.body.hash || null;
    data.title = req.body.title || null;
    data.text = req.body.text || null;
    data.some_text = req.body.some_text || null;
    data.categories_id = req.body.categories_id || null;
    data.time_life = req.body.date || null;
    data.sale = req.body.sale || null;
    data.price = req.body.price || null;
    data.img = '1asfsafkjaslfjvksdjfkshfajkasfhj7578.jpg';
    data.url = crypto.createHmac('sha256', '(QY*(hd9w').update(new Date().getTime() + 'sdf(@*09d3').digest('hex');

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
            Articles.addArticle(data, function(err) {
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