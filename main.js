var Server = require("./lib/server.js").Server;
var Router = require("./lib/router.js").Router;
var static_handler = require("./lib/static.js");
var controller = require("./lib/controller.js");
var error_page = require("./lib/error_page.js");
var path = require("path");

const CONFIG = require(path.join(process.cwd(), "config.json"));

var router = new Router();
router.add("/static", static_handler);
router.add("/", controller.handle);
router.add("", error_page.page(404));
var server = [];
for (var i = 0; i < 4; ++i) {
    server[i] = new Server(CONFIG.PORT, i, router);
}