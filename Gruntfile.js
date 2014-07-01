module.exports = function(grunt) { 
  grunt.initConfig({ 
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      build: "dist",
      package: "package"
    },
    source: {
      scss: ['scss']
    },
    clean: {
      build: {
        src: ['<%= meta.build %>/*', '<%= meta.package %>/*']
      }
    },
    sass: {
      options: {
        style: 'expanded',
        banner: '/*\n' +
                '*  <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("dd-mm-yyyy") %> \n' +
                '*  Created by <%= pkg.author.name %> \n' +
                '*  License <%= pkg.license.type %> \n' +
                '*  <%= pkg.author.site %>\n' +
                '*/\n\n' 
      },
      dist: {
        files: {
          '<%= meta.build %>/<%= pkg.name %>.css': ['<%= source.scss %>/blub.scss']
        }
      }
    },
    cssmin: {
      add_banner: {
        options: {
          report: 'gzip',
        banner: '/*\n' +
                '*  <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("dd-mm-yyyy") %> \n' +
                '*  Created by <%= pkg.author.name %> \n' +
                '*  License <%= pkg.license.type %> \n' +
                '*  <%= pkg.author.site %>\n' +
                '*/\n\n'
        },
        files:{
          '<%= meta.build %>/<%= pkg.name %>.min.css': ['<%= meta.build %>/<%= pkg.name %>.css']
        }
      }
    },
    compress: {
      main: {
        options: {
          archive: '<%= meta.package %>/blub-buttons.zip'
        },
        files: [
          {expand: true, cwd: '<%= meta.build %>/', src: ['**'], dest: 'css/'}
        ]
      }
    },
  });
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.registerTask('default', ['clean', 'sass', 'cssmin', 'compress']);
};