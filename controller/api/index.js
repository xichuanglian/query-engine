var error_page = require("../../lib/error_page.js");

exports.GET = function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.write("api on server" + req.server_id);
    res.end();
};

exports.query = {
    "GET" : function(req, res) {
        //var query = "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_SCHEMA='dbName'";
        var query = "show tables";
        req.db.query(query, function(err, rows, fields) {
            if (err) {
                error_page.render(500, req, res, err);
            } else {
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                for (var i = 0; i < rows.length; ++i) {
                    for (var field in rows[i]) {
                        res.write(rows[i][field] + " ");
                    }
                    res.write("\n");
                }
                res.end();
            }
        });
    }
};