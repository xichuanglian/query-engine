var Server = require("./lib/server.js");
var Router = require("./lib/router.js");
var static_handler = require("./lib/static.js");
var controller = require("./controller");
var error_page = require("./lib/error_page.js");

const PORT = 8080;

var router = new Router();
router.add("/static", static_handler);
router.add("/", controller);
router.add("", error_page.page(404));
var server = new Server(PORT, 0, router);