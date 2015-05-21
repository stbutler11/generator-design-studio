// Generated on 2015-05-14 using
// generator-webapp 0.5.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  var config = {
    app: 'test/live_preview/app',
    dist: 'dist',
    staging: '.staging',
    bundle: '$BUNDLE$',
    sdkNameOneWord: "$SDKONE$",
    //sdkName: "$SDKNAME$",
    sdkNameLower:"$SDKLOWER$",
    version: "1.0.0"
  };

    // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-replace');

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    config: config,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      js: {
        files: ['./src/component/res/{,*/}*.js'],
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
      jstest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['test:watch']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      styles: {
        files: ['./src/component/res/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer'],
        options: {
          livereload: true
        }
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= config.app %>/images/{,*/}*'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        open: true,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect().use('/bower_components', connect.static('./test/live_preview/bower_components')),
              connect().use('/src', connect.static('./src')),
              connect.static(config.app)
            ];
          }
        }
      }
    },

    // Empties folders to start fresh
    clean: {
      server: '.tmp',
      staging: '.staging'
    },

    // Copies remaining files to places other tasks can use
    copy: {
      styles: {
        expand: true,
        dot: true,
        cwd: '<%= config.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },
    //Insert variables into feature files
        replace: {
          dist: {
            options: {
              patterns: [
                {
                  match: 'bundle',
                  replacement: '<%= config.bundle %>'
                },
                {
                  match: 'version',
                  replacement: '<%= config.version %>'
                },
                {
                  match: 'titleLower',
                  replacement: '<%= config.sdkNameLower %>'
                },
                {
                  match: 'titleOneWord',
                  replacement: '<%= config.sdkNameOneWord %>'
                }
              ]
            },
            files: [
              {expand: true, flatten: true, src: 'src/feature_files/*',dest: 'src/feature_files/' }
            ]
        }
      },
    // Run some tasks in parallel to speed up build process
    concurrent: {
      server: [
        'copy:styles'
      ]
    },

    compress : {
      plugin: {
        options: {
            mode: 'zip',
            archive: '<%= config.staging %>/plugins/<%= config.bundle %>_<%= config.version %>.jar'
        },
        files: [{
            expand: true,
            cwd: 'src/component',
            src: [ '**' ]
          }]
      },
      artifacts: {
        options: {
            mode: 'zip',
            archive: '<%= config.staging %>/artifacts.jar'
        },
        files: [{
            expand: true,
            cwd: 'src/feature_files',
            src: [ 'artifacts.xml' ]
          }]
      },
      content: {
        options: {
            mode: 'zip',
            archive: '<%= config.staging %>/content.jar'
        },
        files: [{
            expand: true,
            cwd: 'src/feature_files',
            src: [ 'content.xml' ]
          }]
      },
      feature: {
        options: {
            mode: 'zip',
            archive: '<%= config.staging %>/features/<%= config.sdkNameLower %>_<%= config.version %>.jar'
        },
        files: [{
            expand: true,
            cwd: 'src/feature_files',
            src: [ 'feature.xml' ]
          }]
      },
      dist: {
        options: {
            mode: 'zip',
            archive: 'dist/<%= config.sdkNameOneWord %>.zip'
        },
        files: [{
            expand: true,
            cwd: '<%= config.staging %>',
            src: [ '**' ]
          }]
      },
    }
  });


  grunt.registerTask('serve', 'start the server and preview your app, --allow-remote for remote access', function () {
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

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run([target ? ('serve:' + target) : 'serve']);
  });

  grunt.registerTask('default', [
    'serve'
  ]);

  grunt.registerTask('dist', ['clean:staging', 'replace' ,'compress']);
};
