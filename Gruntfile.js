module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'css/style.css': 'scss/style.scss'
				}
			}
		},
		jade: {
			compile: {
				files: {
					'index.html': 'index.jade'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-jade');

	grunt.registerTask('default', ['sass', 'jade']);

};