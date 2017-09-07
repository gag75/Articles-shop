import { connection } from '../db/mysqlConfig'

export function existenceName(name, callback) {
    let sql = `SELECT id FROM user WHERE name='${name}'`;

    connection(sql, function(err, rows) {
        if(err){
            callback(err);
        } else {
            callback(err, rows.length);
        }
    });
}

export function existenceEmail(email, callback) {
    let sql = `SELECT id FROM user WHERE email='${email}'`;

    connection(sql, function(err, rows) {
        if(err){
            callback(err);
        } else {
            callback(err, rows.length);
        }
    });
}

export function existenceAdmin(hash, callback) {
    let sql = `SELECT id FROM user WHERE hashAuth='${hash}' AND type='2'`;

    connection(sql, function(err, rows) {
        if(err){
            callback(err);
        } else {
            callback(err, rows.length);
        }
    });
}

export function hasHashAuth(hash, callback) {
    let sql = `SELECT id FROM user WHERE hashAuth='${hash}'`;

    connection(sql, function(err, rows) {
        if(err){
            callback(err);
        } else {
            callback(err, rows.length);
        }
    });
}

export function hasHash(hash, callback) {
    let sql = `SELECT id FROM user WHERE hashAuth='${hash}'`;

    connection(sql, function(err, rows) {
        if(err){
            callback(err);
        } else {
            callback(err, rows);
        }
    });
}

export function create(user, callback) {
    let sql = (`
        INSERT INTO user (name,fullName,pass,type,dateReg,email,ipReg)
    `);

    sql += (`
        VALUES('${user.name}','${user.fullName}','${user.pass}',1,'${user.date}','${user.email}',INET_ATON('${user.ip}'))`
    );

    connection(sql, function(err, rows) {
        if(err){
            callback(err);
        } else {
            callback(err, rows.insertId);
        }
    });
}

export function auth(user, callback) {
    let sql = (
        `SELECT id, name, email, fullName, type FROM user WHERE name='${user.name}' AND pass='${user.pass}'
    `);

    connection(sql, function(err, rows) {
        if(err){
            callback(err);
        } else {
            callback(err, rows);
        }
    });
}

export function authHash(hash, callback) {
    let sql = (
        `SELECT id, name, email, fullName, type FROM user WHERE hashAuth='${hash}'
    `);

    connection(sql, function(err, rows) {
        if(err){
            callback(err);
        } else {
            callback(err, rows);
        }
    });
}

export function setHashAuth(user, callback) {
    var sql = (`
        UPDATE user SET hashAuth='${user.hash}' WHERE id=${user.userId}`
    );

    connection(sql, function(err) {
        callback(err);
    });
}

export function setHashResetPass(user, callback) {
    var sql = (`
        UPDATE user SET hashResetPass='${user.hash}' WHERE email='${user.email}'`
    );

    connection(sql, function(err) {
        callback(err);
    });
}

export function hasHashResetPass(hash, callback) {
    let sql = `SELECT id FROM user WHERE hashResetPass='${hash}'`;

    connection(sql, function(err, rows) {
        if(err){
            callback(err);
        } else {
            callback(err, rows.length);
        }
    });
}

export function setNewPassByHash(user, callback) {
    var sql = (`
        UPDATE user SET pass='${user.pass}', hashResetPass='' WHERE hashResetPass='${user.hash}'`
    );

    connection(sql, function(err) {
        callback(err);
    });
}

export function changePassHash(user, callback) {
    var sql = (`
        UPDATE user SET pass='${user.pass}' WHERE hashAuth='${user.hash}'`
    );

    connection(sql, function(err) {
        callback(err);
    });
}

export function changeNameHash(user, callback) {
    var sql = (`
        UPDATE user SET name='${user.name}' WHERE hashAuth='${user.hash}'`
    );

    connection(sql, function(err) {
        callback(err);
    });
}

export function usersById(users_id, callback) {
    let sql = `SELECT id, name FROM user WHERE 0`;
    let data = '';

    users_id.forEach(id => {
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