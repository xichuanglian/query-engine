var path = require('path');
var send_file = require('./send_file.js');

module.exports = function(req, res) {
    var pattern = new RegExp("^\/static\/", "");
    var url_path = req.path.replace(pattern, "");
    var filePath = path.join(__dirname, "../static/", url_path);
    send_file.send(filePath, 200, res);
};