import config from '../config/config.js'
import mysql from 'mysql'

export function connection(sql,callback){
    let connection = mysql.createConnection({
        host: config.mysql.host,
        user: config.mysql.user,
        password: config.mysql.pass,
        database: config.mysql.dbName,
    });

    connection.connect(function(err){
        connection.query(sql,callback);
        connection.end();
    });
}