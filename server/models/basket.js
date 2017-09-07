import { connection } from '../db/mysqlConfig'

export function getIdArticles(userId, status, callback) {
    let sql = `SELECT article_id FROM accountingArticles WHERE user_id='${userId}' AND status='${status}'`;

    connection(sql, function(err, rows) {
        if(err){
            callback(err);
        } else {
            callback(err, rows);
        }
    });
}

export function buy(idUser, idArticle, callback) {
    let sql = `INSERT INTO accountingArticles (user_id, article_id, status)
        VALUES('${idUser}','${idArticle}',2)`;
    connection(sql, function(err) {
        callback(err);
    });
}

export function getArticles(nextId, callback) {
    let sql = `SELECT * FROM accountingArticles WHERE status='2' `;

    if (nextId) {
        sql += ` AND id < ${nextId} `;
    }
    
    sql += "ORDER BY id DESC LIMIT 11";
    connection(sql, function(err, articles) {
        if(err){
            callback(err);
        } else {
            let nextId;
            if (articles.length == 11) {
                nextId = articles[articles.length - 2].id;
            } else {
                nextId = -1;
            }
            articles = articles.slice(0,10);
            callback(err, articles, nextId);
        }
    });
}

export function articleAdminOk(id, callback) {
    let sql = `UPDATE accountingArticles SET status='1' WHERE id=${id}`;

    connection(sql, function(err) {
        callback(err);
    });
}

export function articleAdminCancel(id, callback) {
    let sql = `UPDATE accountingArticles SET status='0' WHERE id=${id}`;

    connection(sql, function(err) {
        callback(err);
    });
}