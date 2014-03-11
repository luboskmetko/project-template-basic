module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        compass: {
            options: {
                sassDir: 'assets/scss',
                cssDir: 'assets/css',
                imagesDir: 'assets/img',
                fontsDir: 'assets/fonts',
                javascriptsDir: 'assets/js',
                relativeAssets: true,
                importPath: [ 'public/assets/bower_components/' ],
                require: [
                    path.resolve(path.join('public','assets','bower_components','compass-retina','lib','sass_extensions.rb'))
                ]
            },
            dev: {
                options: {
                    appDir: 'public/',
                    outputStyle: 'expanded',
                    noLineComments: false,
                    trace: true
                }
            },
            build: {
                options: {
                    appDir: 'public/',
                    cssPath: 'build/assets/css',
                    outputStyle: 'compressed',
                    noLineComments: false,
                    trace: false
                }
            }
        },

        notify: {
            scss: {
                options: {
                    message: "Styles compiled"
                }
            },
            js: {
                options: {
                    message: "JS checked"
                }
            },
            build: {
                options: {
                    message: "Project built"
                }
            }
        },

        requirejs: {
            build: {
                options: {
                    appDir: 'public/',
                    dir: 'build/',
                    mainConfigFile: 'public/assets/js/config.js',
                    skipDirOptimize: true,
                    optimize: 'uglify2',
                    optimizeCss: 'none',
                    fileExclusionRegExp: /^(\.|css|scss)/,
                    useStrict: true,
                    uglify2: {
                        preserveComments: 'some'
                    },
                    modules: [
                        {
                            name: 'main',
                            exclude: ['require', 'modernizr']
                        }
                    ],
                    done: function(done, output) {
                        grunt.log.subhead('Removing bower_components form build:');
                        var rmdir = require('rimraf');
                        rmdir('build/assets/bower_components', function (ex) {
                            if (ex) {
                                grunt.log.warn(ex);
                                done(new Error('failed to remove bower_components.'));
                            } else {
                                grunt.log.ok('bower_components removed.');
                                done();
                            }
                        });
                    }
                }
            }
        },

        modernizr: {
            build: {
                devFile: 'public/assets/bower_components/modernizr/modernizr.js',
                outputFile: 'public/assets/js/modernizr.js',
                extra: {
                    load: false
                },
                files: {
                    src: [
                        'public/assets/js/**/*.js',
                        'public/assets/scss/**/*.scss',
                        '!public/assets/js/modernizr.js',
                        '!public/assets/js/modernizr-custom/**/*.js'
                    ]
                },
                customTests: [ 'public/assets/js/modernizr-custom/**/*.js' ],
                uglify: false
            }
        },

        uglify: {
            dev: {
                options: {
                    preserveComments: 'some'
                },
                files: [{
                    src: 'public/assets/bower_components/requirejs/require.js',
                    dest: 'public/assets/js/require.js'
                }, {
                    src: 'public/assets/js/modernizr.js',
                    dest: 'public/assets/js/modernizr.js'
                }]
            },
            build: {
                options: {
                    preserveComments: 'some'
                },
                files: [{
                    src: 'public/assets/js/config-build.js',
                    dest: 'build/assets/js/config.js'
                }, {
                    src: 'public/assets/bower_components/requirejs/require.js',
                    dest: 'build/assets/js/require.js'
                }, {
                    src: 'public/assets/js/modernizr.js',
                    dest: 'build/assets/js/modernizr.js'
                }]
            }
        },

        jshint: {
            options: {
                "evil": true,
                "regexdash": true,
                "browser": true,
                "wsh": true,
                "trailing": true,
                "sub": true
            },
            dev: [
                'public/assets/js/**/*.js',
                '!public/assets/js/modernizr.js',
                '!public/assets/js/require.js'
            ]
        },

        watch: {
            js: {
                files: ['public/assets/js/**/*.js'],
                tasks: ['jshint:dev', 'notify:js']
            },
            scss: {
                files: ['public/assets/scss/**/*.scss'],
                tasks: ['compass:dev', 'notify:scss']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-modernizr');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['modernizr:build', 'uglify:dev', 'watch']);
    grunt.registerTask('build', ['jshint:dev', 'modernizr:build', 'requirejs:build', 'compass:build', 'uglify:build', 'notify:build']);
};
