module.exports = function(grunt) {

  grunt.initConfig({

  watch: {
    js: {
      files: ['src/**/*.js'],
      tasks: ['concat:app', 'babel', 'browserify', 'concat:lib', 'concat:dist'],
      options: {
        spawn: false,
      },
    },
    css: {
      files: ['src/main.scss'],
      tasks: ['sass','concat:css', 'copy'],
      options: {
        spawn: false,
      },
    }
  },

  sass: {
    dist: {
      options: {
       style: 'expanded',
       sourcemap: 'none'
     },
      files: {
        'dist/app.css': 'src/main.scss'
      }
    }
  },

   babel: {
        options: {
            sourceMap: true,
            presets: ['es2015']
        },
        app: {
            files: {
                'dist/app.js': ['dist/app.js']
            }
        }
    },

    browserify: {
      dist: {
        files: {
          'dist/app.js': 'dist/app.js'
        }
      }
    },

    concat: {
      options: {
        separator: ';',
      },
      app: {
        src: [
          'src/**/*.js',
        ],
        dest: 'dist/app.js',
      },

      lib: {
        src: [
          'node_modules/jquery/dist/jquery.min.js',
          'node_modules/bootstrap/dist/js/bootstrap.min.js',
          'vendor/summernote/dist/summernote.min.js',
          'node_modules/sn-components-api/dist/dist.js',
          'vendor/modes/markdown/markdown.js'
        ],
        dest: 'dist/lib.js',
      },

      dist: {
        src: ['dist/lib.js', 'dist/app.js'],
        dest: 'dist/dist.js',
      },

      css: {
        options: {
          separator: '',
        },
        src: ['node_modules/bootstrap/dist/css/bootstrap.min.css', 'dist/app.css'],
        dest: 'dist/dist.css',
      }
    },

    copy: {
      main: {
        files: [
          {expand: true, flatten: true, src: ['vendor/summernote/dist/font/**/*'], dest: 'dist/font/', filter: 'isFile'},
          {expand: true, flatten: true, src: ['vendor/summernote/dist/summernote.css'], dest: 'dist/', filter: 'isFile'}
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['concat:app', 'babel', 'browserify', 'concat:lib', 'concat:dist', 'sass', 'concat:css', 'copy']);
};
