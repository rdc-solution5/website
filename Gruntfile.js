'use strict';
// # Globbing
// for performance reasons we're only matching one level down:
// '<%= config.src %>/templates/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%= config.src %>/templates/pages/**/*.hbs'

// eXSxY83wj5XwpdSwm5FhH92TseZai93rbqqwKxPGDveTico0soSDNN9FxyFF

module.exports = function (grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
      config: {
        src: 'src',
        dist: 'dist'
      },

      watch: {
        assemble: {
          files: [
            '<%= config.src %>/{content,data,templates}/**/*.{md,hbs,yml}',
            '<%= config.src %>/data/**/*.json',
            '<%= config.src %>/assets/**/*.js',
            '<%= config.src %>/assets/**/*.{less,css}'
          ],
          tasks: ['development']
        },
        livereload: {
          options: {
            livereload: '<%= connect.options.livereload %>'
          },
          files: [
            '<%= config.dist %>/{,*/}*.html',
            '<%= config.dist %>/assets/{,*/}*.css',
            '<%= config.dist %>/assets/{,*/}*.js',
            '<%= config.dist %>/assets/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
          ]
        }
      },

      connect: {
        options: {
          port: 20000,
          livereload: true,
          hostname: '127.0.0.1'
        },
        livereload: {
          options: {
            open: true,
            base: [
              '<%= config.dist %>'
            ]
          }
        }
      },
      assemble: {
        options: {
          layoutdir: '<%= config.src %>/templates/layouts',
          assets: '<%= config.dist %>/assets',
          helpers: './libs/helpers/*.js',
          versions: Date.now()
        },
        // 首页
        index: {
          options: {
            expand: true,
            flatten: true,
            versions: Date.now(),
            jsFilename: 'index.js',
            cssFilename: 'home.css',
            layout: 'default.hbs',
            data: '<%= config.src %>/data/**/*.{json,yml}',
            partials: '<%= config.src %>/templates/partials/**/*.hbs'
          },
          files: {
            '<%= config.dist %>/': [
              '<%= config.src %>/templates/pages/index.hbs'
            ]
          }
        },
        // 产品
        product: {
          options: {
            expand: true,
            flatten: true,
            versions: Date.now(),
            jsFilename: 'product.js',
            cssFilename: 'product.css',
            layout: 'default.hbs',
            data: '<%= config.src %>/data/**/*.{json,yml}',
            partials: '<%= config.src %>/templates/partials/**/*.hbs'
          },
          files: {
            '<%= config.dist %>/': [
              '<%= config.src %>/templates/pages/product.hbs'
            ]
          }
        },
        // 解决方案
        solution: {
          options: {
            expand: true,
            flatten: true,
            versions: Date.now(),
            jsFilename: 'solution.js',
            cssFilename: 'solution.css',
            layout: 'default.hbs',
            data: '<%= config.src %>/data/**/*.{json,yml}',
            partials: '<%= config.src %>/templates/partials/**/*.hbs'
          },
          files: {
            '<%= config.dist %>/': [
              '<%= config.src %>/templates/pages/solution.hbs'
            ]
          }
        },
        // 核心价值
        values: {
          options: {
            expand: true,
            flatten: true,
            versions: Date.now(),
            jsFilename: 'values.js',
            cssFilename: 'values.css',
            layout: 'default.hbs',
            data: '<%= config.src %>/data/**/*.{json,yml}',
            partials: '<%= config.src %>/templates/partials/**/*.hbs'
          },
          files: {
            '<%= config.dist %>/': [
              '<%= config.src %>/templates/pages/values.hbs'
            ]
          }
        },
        // 成功案例
        success: {
          options: {
            expand: true,
            flatten: true,
            versions: Date.now(),
            jsFilename: 'success.js',
            cssFilename: 'success.css',
            layout: 'default.hbs',
            data: '<%= config.src %>/data/**/*.{json,yml}',
            partials: '<%= config.src %>/templates/partials/**/*.hbs'
          },
          files: {
            '<%= config.dist %>/': [
              '<%= config.src %>/templates/pages/success.hbs'
            ]
          }
        },
        // 成功案例
        about: {
          options: {
            expand: true,
            flatten: true,
            versions: Date.now(),
            jsFilename: 'about.js',
            cssFilename: 'about.css',
            layout: 'default.hbs',
            data: '<%= config.src %>/data/**/*.{json,yml}',
            partials: '<%= config.src %>/templates/partials/**/*.hbs'
          },
          files: {
            '<%= config.dist %>/': [
              '<%= config.src %>/templates/pages/about.hbs'
            ]
          }
        }
    },
    // Before generating any new files,
    // remove any previously-created files.
    clean: ['<%= config.dist %>/**/*.{html,xml, md}'],

    copy: {
      theme: {
        expand: true,
        cwd: '<%= config.src %>/assets',
        src: '**/*.{css,js}',
        dest: '<%= config.dist %>/assets'
      },
      image: {
        expand: true,
        cwd: '<%= config.src %>/assets/images',
        src: '**',
        dest: '<%= config.dist %>/assets/images'
      }
    },
    uglify: {
      options: {
        banner: '/* <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        report: 'min',
        mangle: false
      },
      dist: {
        expand: true,
        cwd: 'dist/assets',
        src: 'js/*.js',
        dest: 'dist/assets/',
        ext: '.js'
      }
    },

    // assemble-less
    less: {
      development: {
        options: {
          compress: true
        },
        files: [{
          expand: true,
          cwd: '<%= config.src %>/assets/css',
          src: '**/*.less',
          dest: '<%= config.dist %>/assets/css',
          ext: '.css'
        }]
      }
    }
  });

grunt.loadNpmTasks('assemble');
grunt.loadNpmTasks('assemble-less');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-cssmin');

grunt.registerTask('server', [
  'build',
  'connect:livereload',
  'clean',
  'less:development',
  'uglify',
  'assemble:index',
  'assemble:product',
  'assemble:solution',
  'assemble:values',
  'assemble:success',
  'assemble:about',
  'watch'
]);
grunt.registerTask('build', [
  'clean',
  'copy',
  'assemble'
]);
grunt.registerTask('development', [
  'clean',
  'less:development',
  'copy',
  'uglify',
  'assemble:index',
  'assemble:product',
  'assemble:solution',
  'assemble:values',
  'assemble:success',
  'assemble:about',
  'watch'
]);
};