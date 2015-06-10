var _    = require("underscore");
var fs   = require("fs");
var path = require("path");
var error_page = require("./error_page.js");

const VIEW_DIR = path.join(__dirname, "../view");

exports.render = function(view, variables, res) {
    var file_path = path.join(VIEW_DIR, view) + ".html";
    fs.readFile(file_path, {"encoding": "utf-8"}, function(err, data) {
        if (err) {
            console.log(err);
            error_page.render(500, null, res, err);
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            var template = _.template(data);
            res.write(template(variables));
            res.end();
        }
    });
};