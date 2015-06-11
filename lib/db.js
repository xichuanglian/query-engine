var mysql = require("mysql");
var path = require("path");
var CONFIG = require(path.join(process.cwd(), "config.json"));

exports.connect = function(site) {
    var pool  = mysql.createPool({
        connectionLimit : 10,
        host            : CONFIG.MYSQL,
        user            : CONFIG.DB_USER,
        password        : CONFIG.DB_PASSWORD,
        database         : site
    });
    return pool;
};