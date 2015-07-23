/**
 * Grunt Automation Task Runner
 * @author James lynn
 */
module.exports = function (grunt) {
	'use strict';

	require('load-grunt-tasks')(grunt);

	// Grunt Config
	grunt.initConfig({

		jshint: {
			target: {
				options: {
					jshintrc: '.jshintrc'
				},
				files: {
					src: [
						'src/js/scripts/**/*.js',
						'test/js/spec/**/*.js'
					]
				}
			}
		},

		karma : {
			target : {
				configFile : 'test/karma.conf.js'
			}
		},

		clean: {
			build: ['build'],
			dist : ['dist']
		},

		copy: {
			build : {files: [
				{
					cwd: 'src/',
					expand: true,
					dest: 'build/',
					src: '**/*'
				}
			]},

			dist : {files: [
				{
					cwd: 'build/assets',
					expand: true,
					dest: 'dist/assets',
					src: '**/*'
				},
				{
					cwd: 'build/js/lib',
					expand: true,
					dest: 'dist/js/lib',
					src: ['*.min.js','require.js']
				},
				{
					src: 'build/favicon.ico',
					dest: 'dist/favicon.ico'
				}
			]}
		},

		less: {
			target : {
				options: {
					compress : true
					/*modifyVars: {
						imgPath: config.cdnUrl
					}*/
				},
				files : {'dist/css/style.css' : 'build/css/style.less'}
			}

		},

		htmlmin: {
			target: {
				options: {
					removeComments: true,
					collapseWhitespace: true,
					collapseBooleanAttributes: true,
					removeAttributeQuotes: true,
					removeRedundantAttributes: true,
					removeEmptyAttributes: true,
					removeEmptyElements: false
				},
				files: [
					{'dist/index.html': 'build/index.html'},
					{
						cwd: 'build/templates/',
						expand: true,
						dest: 'dist/templates/',
						src: ['**/*.html']
					}
				]
			}
		},

		ngAnnotate : {
			options : {
				singleQuotes : true
			},

			target : {
				files: [{
					expand : true,
					cwd: 'build/js/scripts',
					dest: 'build/js/scripts',
					src: '**/*.js'
				}]
			}
		},

		uglify: {
			target: {
				files: [{
					expand: true,
					cwd: 'build/js/scripts',
					src: '**/*.js',
					dest: 'dist/js/scripts'
				},
				{'dist/js/main.js' : 'build/js/main.js'}]
			}
		},

		imagemin : {
			target : {
				files: [{
					expand: true,
					cwd: 'build/assets/img/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'build/assets/img/'
				}]
			}
		},

		execute : {
			target : {
				options: {
					args: ['build', 'dist']
				},
				src: ['sitemap.js']
			}
		}

	});

	//Run jshint and karma unit tests on scripts
	grunt.registerTask('test', ['jshint', 'karma']);

	//Deploy a production build to the 'dist' directory
	grunt.registerTask('deploy', [

		'test', //Run tests

		'clean', //Delete both build and dist directories

		'copy:build', //Copy source files to temporary build directory

		'htmlmin', //Minify html pages and templates

		'less', //Compile and compress LESS files to css

		'ngAnnotate', //Annotate AngularJS injections so they can be minified

		'uglify', //Minify Javascript

		'imagemin', //Compress image assets

		'copy:dist', //Copy remaining files to dist directory

		'execute', //Create sitemap xml for crawlers

		'clean:build' //Delete temporary build directory

	]);

};