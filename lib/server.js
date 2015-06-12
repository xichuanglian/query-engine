var http = require('http');
var url  = require("url");
var path = require("path");
var db_connector = require("./db.js");
var rpc_server = require("./rpc_server.js");
var CONFIG = require(path.join(process.cwd(), "config.json"));

exports.Server = function Server(basePort, id, router) {
    function reqHandler(req, res) {
        var parsed = url.parse(req.url, true);
        req.query = parsed.query;
        req.search = parsed.search;
        req.path = parsed.pathname;
        req.server_id = id;
        req.db = db_connector.connect(CONFIG.SITES[id]);
        var handle = router.route(req.path);
        handle(req, res);
    }

    var initialize = function () {
        var port = basePort + id;
        var rpc_port = basePort + 800 + id;
        var httpServer = http.createServer(reqHandler);

        rpc_server.create(id, rpc_port);
        httpServer.listen(port, function() {
           console.log("Server " + id + " started. Listening on port: " + port);
        });
    };

    initialize();
};