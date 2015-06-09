var fs = require("fs");
var path = require('path');

module.exports = function(code) {
    return function(req, res) {
        res.statusCode = code;
        var filePath = path.join(__dirname, "../static/error/" + code + ".html");
        fs.readFile(filePath, "binary", function(err, file) {
            if (err) {
                res.writeHead(500, {
                    'Content-Type': 'text/plain'
                });
                console.log(err);
                res.end();
            } else {
                res.writeHead(code, {
                    'Contend-Type': 'text/html'
                });
                res.write(file, "binary");
                res.end();
            }
        });
    };
};
