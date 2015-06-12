var dnode = require("dnode");

function func_hello(id) {
    return function(name, cb) {
        cb("Hello " + name + ". From server " + id);
    };
}

exports.create = function(id, port) {
    var server = dnode({
       hello : func_hello(id)
    });
    server.listen(port);
};