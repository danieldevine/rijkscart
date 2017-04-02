module.exports = function(grunt) {

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        dirs: {
            assets: 'dist/assets/'
        },

        sass_globbing: {
            glob_target: {
                files: {
                    'src/scss/globmaps/_baseMap.scss': 'src/scss/partials/base/*.scss',
                    'src/scss/globmaps/_vendorMap.scss': 'src/scss/partials/vendors/*.scss',
                    'src/scss/globmaps/_layoutMap.scss': 'src/scss/partials/layout/*.scss',
                    'src/scss/globmaps/_moduleMap.scss': 'src/scss/partials/modules/*.scss',
                    'src/scss/globmaps/_componentMap.scss': 'src/scss/partials/components/*.scss',
                    'src/scss/globmaps/_contentMap.scss': 'src/scss/partials/content/*.scss',
                },
                options: {
                    useSingleQuotes: true,
                    signature: '//glob it all to glob.'
                }
            }
        },

        concat: {
            options: {
                stripBanners: true,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */',
            },
            dist: {
                src: [
                    'src/js/libs/*.js',
                    'src/js/main.js'
                ],
                dest: '<%= dirs.assets %>js/production.js',
            }
        },

        uglify: {
            build: {
                src: '<%= dirs.assets %>js/production.js',
                dest: '<%= dirs.assets %>js/production.min.js',
            }
        },


        sass: {
            dev: {
                files: {
                    '<%= dirs.assets %>css/global.css': 'src/scss/global.scss'
                }
            }

        },


        postcss: {
            options: {

                map: {
                    inline: false, // save all sourcemaps as separate files...
                    annotation: '<%= dirs.assets %>css/maps/' // ...to the specified directory
                },

                processors: [
                    require('pixrem')(), // add fallbacks for rem units
                    require('autoprefixer')({
                        browsers: 'last 5 versions'
                    }), // add vendor prefixes
                    require('cssnano')({
                        reduceIdents: false
                    })
                ]
            },
            dist: {
                src: '<%= dirs.assets %>css/global.css',
                dest: '<%= dirs.assets %>css/global.min.css'
            }
        },

        image: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'src/img/raw/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: '<%= dirs.assets %>img/'
                }]
            }
        },

        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'src/img/raw/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'src/img/store/'
                }, ],
            },
        },

        clean: {
            main: {
                src: ['src/img/raw/*', '!src/img/raw/donotdelete.jpg'],
            }
        },

        watch: {
            options: {
                livereload: true,
            },

            scripts: {
                files: ['src/js/*.js', 'src/js/libs/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                },
            },

            css: {
                files: ['src/scss/**'],
                tasks: ['sass_globbing', 'sass', 'postcss'],
                options: {
                    spawn: false
                }
            },

            php: {
                files: ['dist/**/*.php'],
                options: {
                    spawn: false
                }
            },

            images: {
                files: ['src/img', 'src/img/raw/**/*.{png,jpg,gif}'],
                tasks: ['image', 'copy', 'clean'],
                options: {
                    spawn: false,
                },
            },


        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'dist/**/*.php',
                        '<%= dirs.assets %>css/global.min.css',
                        '<%= dirs.assets %>js/production.min.js'
                   ]
                },
                options: {
                    port: 8080,
                    proxy: "dev.<%= pkg.name %>",
                    watchTask: true
                }
            }
        }

    });

    grunt.registerTask('default', [ 'sass_globbing', 'sass', 'concat', 'uglify', 'postcss', 'image', 'copy', 'clean', 'browserSync', 'watch', ]);

};
