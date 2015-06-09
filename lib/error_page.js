var path = require('path');
var send_file = require('./send_file.js');

exports.page = function(code) {
    return function(req, res) {
        res.statusCode = code;
        var filePath = path.join(__dirname, "../static/error/" + code + ".html");
        send_file.send(filePath, code, res);
    };
};
