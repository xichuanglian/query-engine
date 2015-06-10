var error_page = require("./error_page.js");

exports.Router = function Router() {
    var handles = {};
    var paths = [];

    this.route = function(path) {
        for (var i = 0; i < paths.length; ++i) {
            var key = paths[i];
            if (handles.hasOwnProperty(key) && path.search(key) > -1) {
                return handles[key];
            }
        }
        return error_page(404);
    };

    this.add = function(path, handle) {
        paths.push(path);
        handles[path] = handle;
    };
};