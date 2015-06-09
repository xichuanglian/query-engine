var path = require("path");
var fs = require("fs");

module.exports = function(req, res) {
    var pattern = new RegExp("^\/static\/", "");
    var url_path = req.path.replace(pattern, "");
    var filePath = path.join(__dirname, "../static/", url_path);
    fs.readFile(filePath, "binary", function(err, file) {
        if (err) {
            res.writeHead(500, {
                'Content-Type': 'text/plain'
            });
            console.log(err);
            res.end();
        } else {
            res.writeHead(200, {
                'Contend-Type': 'text/html'
            });
            res.write(file, "binary");
            res.end();
        }
    });
};