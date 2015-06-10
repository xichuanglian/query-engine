exports.GET = function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.write("api on server" + req.server_id);
    res.end();
};