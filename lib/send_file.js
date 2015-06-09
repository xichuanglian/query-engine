var fs = require("fs");
var path = require("path");
var error_page = require("./error_page.js");

const DICT = {
    'htm'  : 'text/html',
    'html' : 'text/html',
    'txt'  : 'text/plain',
    'xml'  : 'text/xml',
    'css'  : 'text/css',
    'jpg'  : 'image/jpeg',
    'jpeg' : 'image/jpeg',
    'jpe'  : 'image/jpeg',
    'png'  : 'image/png',
    'js'   : 'application/x-javascript'
};

function parse_content_type(file_path) {
    var ext = path.extname(file_path);
    if (ext.length > 0) {
        return DICT[ext.substr(1)];
    } else {
        return 'text/plain';
    }
}

exports.send = function(file_path, code, res) {
    fs.exists(file_path, function(exists) {
        if (exists) {
            fs.readFile(file_path, "binary", function (err, file) {
                if (err) {
                    res.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });
                    console.log(err);
                    res.write("Server internal error!");
                    res.end();
                } else {
                    var content_type = parse_content_type(file_path);
                    res.writeHead(code, {
                        'Contend-Type': content_type
                    });
                    res.write(file, "binary");
                    res.end();
                }
            });
        } else {
            var handle = error_page.page(404);
            handle(null, res);
        }
    });
};