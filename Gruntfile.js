module.exports = function (grunt) {
	'use strict';

	require('time-grunt')(grunt);
	require('load-grunt-tasks')(grunt);


	var fileList = [
					'public/bower_components/angular/angular.js',
					'public/bower_components/angular-route/angular-route.js',
					'public/bower_components/angular-resource/angular-resource.js',
					'public/bower_components/angular-socket-io/socket.js',

					'public/src/*/config.js',
					'public/src/*/*/*.js',
					'public/src/app.js'
				];

	// Project configuration.
	grunt.initConfig({

		config: {
			src: 'public/angular',
			footer: 'views/index.ejs',
			dist: 'public/dist'
		},

		/**
		 * JsHint
		 */
		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				eqnull: true,
				browser: true,
				//camelcase: true,
				regexp: true,
				//undef: true,
				//unused: true,
				noarg: true
			},
			uses_defaults: [
				'<%= config.src %>/*/*'
			]
		},

		/**
		 * FileBlocks
		 */
		fileblocks: {
			options: {
				rebuild: true
			},
			dev: {
				files: [
					{
						src: '<%= config.footer %>',
						blocks: {
							dev: {
								src: fileList
							}
						}
					}
				]
			},
			dist: {
				files: [
					{
						src: '<%= config.footer %>',
						blocks: {
							dist: {
								src: '<%= config.dist %>/*.js'
							}
						}
					}
				]
			},
		},

		/**
		 * Concat
		 */
		concat: {
			options: {
				separator: ''
			},
			core: {
				src: fileList,
				dest: '/tmp/app.js'
			},
		},

		/**
		 * Uglify Js
		 */
		uglify: {
			options: {
				sourceMap: false,
				preserveComments: false
			},
			files: {
				expand: true,
				//flatten: true,
				cwd: '/tmp',
				src: ['app.js'],
				dest: '<%= config.dist %>',
				ext: '.min.js'
			}
		},


	});

	// tasks
	grunt.registerTask('dev', [
		'jshint',
		'fileblocks:dev'
	]);

	grunt.registerTask('dist', [
		'jshint',
		'concat:core',
		'uglify',
		'fileblocks:dist'
	]);

};