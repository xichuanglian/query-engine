var view = require('./view.js');

exports.page = function(code) {
    return function(req, res, err) {
        res.statusCode = code;
        var data = {
            'has_error': null
        };
        if (err) {
            data['has_error'] = true;
            data['error'] = err.toString();
        }
        view.render("error/"+code, data, res);
    };
};

exports.render = function(code, req, res, err) {
    var handle = exports.page(code);
    handle(req, res, err);
}
