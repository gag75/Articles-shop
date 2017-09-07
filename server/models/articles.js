import { connection } from '../db/mysqlConfig'

export function search(data, callback) {
    let sql = `
        SELECT * FROM Articles`;

    let date = (new Date()).toISOString().replace(/T/, ' ').replace(/\..+/, '').split(' ')[0];

    if (data.categories_id) {
        sql += ` WHERE time_life >'${date}' AND categories_id=${data.categories_id}`
    } else {
        sql += ` WHERE time_life >'${date}' `
    }

    if (data.sort == 2 || data.sort == 3) {
        if (data.nextPrice) {
            if (data.sort == 3) {
                sql += ` AND price<='${data.nextPrice}'`
            } else {
                sql += ` AND price>='${data.nextPrice}'`
            }
            sql += ` AND id NOT IN (SELECT id FROM Articles WHERE price='${data.nextPrice}' AND id>='${data.nextId}')`
        }
        if(data.sort == 3) {
            sql += ` ORDER BY price DESC, id DESC`
        } else {
            sql += ` ORDER BY price, id DESC`   
        }
    } else {
        if (data.nextDate) {
            if (data.sort == 0) {
                sql += ` AND time_life<='${data.nextDate}'`
            } else {
                sql += ` AND time_life>='${data.nextDate}'`
            }
            sql += ` AND id NOT IN (SELECT id FROM Articles WHERE time_life='${data.nextDate}' AND id>='${data.nextId}')`
        }
        if(data.sort == 0) {
            sql += ` ORDER BY time_life DESC, id DESC`
        } else {
            sql += ` ORDER BY time_life, id DESC`   
        }
    }
    sql += ` LIMIT 11`

    connection(sql, function(err, articles) {
        if (err) {
            callback(err);
        } else {
            let nextId, nextPrice, nextDate;
            if (articles.length == 11) {
                nextId = articles[articles.length - 2].id;
                nextPrice = articles[articles.length - 2].price;
                nextDate = articles[articles.length - 2].time_life;
            } else {
                nextId = -1;
                nextPrice = -1;
                nextDate = -1;
            }
            articles = articles.slice(0,10);
            callback(err, articles, nextPrice, nextId, nextDate);
        }
    })
}

export function deleteByCategories(categories_id, callback) {
    let sql = `DELETE FROM Articles WHERE categories_id='${categories_id}'`;

    connection(sql, function(err) {
        callback(err);
    });
}

export function getArticlesById(articles_id, callback) {
    let data = '';

    articles_id.forEach((article_id, i) => {
        if (i == 0) {
            data += ` id='${article_id.article_id}'`;
        } else {
            data += `OR id='${article_id.article_id}'`;
        }
    });

    let sql = `SELECT * FROM Articles WHERE ${data}`;

    connection(sql, function(err, rows) {
        if (err) {
            callback(err);
        } else {
            callback(err, rows);
        }
    });
}

export function getArticlesId(articles_id, categories_id, nextId, callback) {
    let data = '';

    articles_id.forEach((article_id, i) => {
        if (i == 0) {
            data += ` id='${article_id.article_id}'`;
        } else {
            data += `OR id='${article_id.article_id}'`;
        }
    });

    let date = (new Date()).toISOString().replace(/T/, ' ').replace(/\..+/, '').split(' ')[0];

    let sql = `SELECT * FROM Articles WHERE time_life >'${date}' AND (${data})`;

    if (categories_id) {
        sql += ` AND categories_id='${categories_id}'`
    }

    if (nextId) {
        sql += ` AND id < '${nextId}'`
    }

    sql+=` ORDER BY id DESC LIMIT 11`

    connection(sql, function(err, articles) {
        if (err) {
            callback(err);
        } else {
            let nextId, nextPrice, nextDate;
            if (articles.length == 11) {
                nextId = articles[articles.length - 2].id;
                nextPrice = articles[articles.length - 2].price;
                nextDate = articles[articles.length - 2].time_life;
            } else {
                nextId = -1;
                nextPrice = -1;
                nextDate = -1;
            }
            articles = articles.slice(0,10);
            callback(err, articles, nextPrice, nextId, nextDate);
        }
    });
}

export function item(url, callback) {
    let sql = `SELECT * FROM Articles WHERE url='${url}'`;

    connection(sql, function(err, rows) {
        if (err) {
            callback(err);
        } else if (rows.length == 0) {
            err = 'Нет такой статьи!'
            callback(err);
        } else {
            callback(err, rows[0]);
        }
    });
}

export function showListAdmin(articles_id, callback) {
    let data = '';

    articles_id.forEach((article_id, i) => {
        if (i == 0) {
            data += ` WHERE id='${article_id.article_id}'`;
        } else {
            data += `OR id='${article_id.article_id}'`;
        }
    });

    let sql = `SELECT * FROM Articles` + data;
    connection(sql, function(err, articles) {
        if (err) {
            callback(err);
        } else {
            articles_id.forEach((article_id, index) => {
                for (let i = 0; i < articles.length; i++) {
                    if (article_id.article_id == articles[i].id) {
                        delete articles[i].id;
                        articles_id[index] = {
                            ...article_id,
                            ...articles[i]
                        }
                    }
                }
            });
            callback(err, articles_id);
        }
    });
}


export function addArticle(data, callback) {
    let sql = `INSERT INTO Articles (title, some_text, text, time_life, price, sale, categories_id, url, img)
        VALUES(
        '${data.title}',
        '${data.some_text}',
        '${data.text}',
        '${data.time_life}',
        '${data.price}',
        '${data.sale}',
        '${data.categories_id}',
        '${data.url}',
        '${data.img}')`;

    connection(sql, function(err) {
        callback(err);
    });
}