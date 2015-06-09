module.exports = function Router() {
    var handles = {};

    this.route = function(path) {
        for (var key in handles) {
            if (handles.hasOwnProperty(key) && path.search(key) > -1) {
                return handles[key];
            }
        }
    };

    this.add = function(path, handle) {
        handles[path] = handle;
    };
};