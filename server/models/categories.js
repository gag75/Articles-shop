import { connection } from '../db/mysqlConfig'

export function show(callback) {
    let sql = `SELECT * FROM categories`;

    connection(sql, function(err, rows) {
        if(err){
            callback(err);
        } else {
            callback(err, rows);
        }
    });
}

export function showById(categories_id, callback) {
    let data = '';

    categories_id.forEach((categorie_id, i) => {
        if (i == 0) {
            data += ` id='${categorie_id.categories_id}'`;
        } else {
            data += `OR id='${categorie_id.categories_id}'`;
        }
    });

    let sql = `SELECT * FROM categories WHERE`;

    sql+=data;

    connection(sql, function(err, rows) {
        if(err){
            callback(err);
        } else {
            callback(err, rows);
        }
    });
}

export function create(name, callback) {
    let sql = `INSERT INTO categories (categories)
        VALUES('${name}')`;

    connection(sql, function(err) {
        callback(err);
    });
}

export function update(name, id, callback) {
    let sql = `UPDATE categories SET categories='${name}' WHERE id=${id}`;

    connection(sql, function(err) {
        callback(err);
    });
}

export function categoriesById(categories_id, callback) {
    let sql = `SELECT * FROM categories WHERE 0`;
    let data = '';

    categories_id.forEach(id => {
        data += ` OR id=${id}`
    });
    sql+=data;

    connection(sql, function(err, rows) {
        if (err) {
            callback(err);
        } else {
            callback(err, rows);
        }
    });
}

export function deleteCategories(id, callback) {
    let sql = `DELETE FROM categories WHERE id='${id}'`;

    connection(sql, function(err) {
        callback(err);
    });
}