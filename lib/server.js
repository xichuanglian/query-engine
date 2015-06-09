var http = require('http');
var url  = require("url");


module.exports = function Server(basePort, id, router) {
    function reqHandler(req, res) {
        var parsed = url.parse(req.url, true);
        req.query = parsed.query;
        req.search = parsed.search;
        req.path = parsed.pathname;
        handle = router.route(req.path);
        handle(req, res);
    }

    var initialize = function () {
        var port = basePort + id;
        this.id = id;
        var httpServer = http.createServer(reqHandler);
        httpServer.listen(port, function() {
           console.log("Server " + id + " started. Listening on port: " + port);
        });
    };

    initialize();
};