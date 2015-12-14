/*global module, require */
module.exports = function(grunt) {
    'use strict';

    var config = {
        app: 'test/live_preview/app',
        dist: 'dist',
        staging: '.staging',
        bundle: '<%= bundle %>',
        sdkNameOneWord: '<%= titleOneWord %>',
        version: '1.0.0',
        dsVersion: '15.0.2',
        dsBaseVersion: '15.0',
        timestamp: '201412171344'
    };

    config.sdkNameLower = config.sdkNameOneWord.toLowerCase();

    require('load-grunt-config')(grunt, {
        data: config
    });

    grunt.registerTask('serve', 'start the server and preview your app, --allow-remote for remote access', function() {
        if (grunt.option('allow-remote')) {
            grunt.config.set('connect.options.hostname', '0.0.0.0');
        }
        grunt.task.run([
            'clean:server',
            'concurrent:server',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('default', ['serve']);
    grunt.registerTask('dist', ['clean', 'copy:component', 'replace', 'compress']);
    grunt.registerTask('test', ['karma']);
};
