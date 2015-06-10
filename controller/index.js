var view = require("../lib/view.js");

exports.api = require("./api");

exports.GET = function(req, res) {
    var data = {
        "server_id" : req.server_id
    };
    view.render("index", data, res);
};