/*global module*/
module.exports = {
    options: {
        port: 9000,
        open: true,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost',
        // custom option passed to the middleware
        app: '<%%= app %>'
    },
    livereload: {
        options: {
            middleware: function(connect, options) {
                'use strict';
                return [
                    connect.static('.tmp'),
                    connect().use('/bower_components', connect.static('./test/live_preview/bower_components')),
                    connect().use('/src', connect.static('./src')),
                    connect().use('/', connect.static('./src/component/res/js')),
                    connect.static(options.app)
                ];
            }
        }
    }
};