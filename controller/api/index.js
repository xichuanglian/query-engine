var error_page = require("../../lib/error_page.js");
var dnode = require("dnode");
var path = require("path");
var CONFIG = require(path.join(process.cwd(), "config.json"));

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

exports.rpc = {
    "GET" : function(req, res) {
        var server_id = parseInt(req.query.server);
        var addr = CONFIG.RPC_SERVERS[server_id];
        if (typeof(addr) === "string" || addr instanceof String) {
            var pos = addr.indexOf(':');
            var host = addr.substr(0, pos);
            var port = parseInt(addr.substr(pos + 1));
            var d = dnode.connect({host: host, port: port});
            d.on('remote', function (remote) {
                remote.hello("server " + req.server_id, function (reply) {
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    });
                    res.write(reply);
                    res.end();
                });
            });
        } else {
            error_page.render(400, req, res, "Server ID Error");
        }
    }
};