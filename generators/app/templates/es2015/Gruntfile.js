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
    config.sdkExtensionTitle = 'Design Studio SDK Extendsion ' + config.sdkNameOneWord;

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
            'concurrent:watch'
        ]);
    });

    grunt.registerTask('default', ['serve']);
    grunt.registerTask('updateVersion', 'Updates the version in the contribution and manifest',
        ['xmlpoke:updateContributionXml', 'replace:manifest']);
    grunt.registerTask('dist', 'Creates a zip file that can be imported into Design Studio as an SDK extension',
        ['clean', 'updateVersion', 'copy:component', 'replace:dist', 'compress']);
    grunt.registerTask('test', ['karma:unit:start', 'watch']);
};
