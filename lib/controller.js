var base_controller = require("../controller");
var error_page = require("./error_page.js");

function route(controller, path, req, res) {
    var regexp = new RegExp("^\/([^\/]+)", "");
    var match = path.match(regexp);
    if (match) {
        var name = match[1];
        if (controller.hasOwnProperty(name)) {
            route(controller[name], path.replace(regexp, ""), req, res);
        } else {
            error_page.render(404, req, res);
        }
    } else {
        if (controller.hasOwnProperty(req.method)) {
            controller[req.method](req,res);
        } else {
            error_page.render(400, req, res);
        }
    }
}

exports.handle = function(req, res) {
    route(base_controller, req.path, req, res);
};