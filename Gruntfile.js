module.exports = function (grunt) {
	'use strict';

	require('time-grunt')(grunt);
	require('load-grunt-tasks')(grunt);


	var fileList = [
					'public/bower_components/angular/angular.js',
					// 'public/bower_components/angular-route/angular-route.js',
					'public/bower_components/angular-ui-router/release/angular-ui-router.js',
					'public/bower_components/angular-resource/angular-resource.js',
					'public/bower_components/angular-socket-io/socket.js',

					'public/src/js/*/config.js',
					'public/src/js/*/*/*.js',
					'public/src/js/app.js'
				];

	// Project configuration.
	grunt.initConfig({

		config: {
			src: 'public/src/js',
			css: 'public/src/css',
			less: 'public/src/less',
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
						options: {
							prefix: '/' 
						},
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
						options: {
							prefix: '/' 
						},
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
				// flatten: true,
				cwd: '/tmp',
				src: ['app.js'],
				dest: '<%= config.dist %>',
				ext: '.min.js'
			}
		},

		/**
		 * Less
		 */
		less: {
			dist: {
				options: {
					cleancss: true,
					compress: true,
					sourceMap: false
				},
				files: {
					"<%= config.dist %>/app.min.css": "<%= config.less %>/app.less",
				}
			},
			dev: {
				options: {
					compress: false,
					sourceMap: false
				},
				files: {
					"<%= config.css %>/app.css": "<%= config.less %>/app.less"
				}
			}
		},


	});

	// tasks
	grunt.registerTask('dev', [
		'jshint',
		'less:dev',
		'fileblocks:dev'
	]);

	grunt.registerTask('dist', [
		'jshint',
		'concat:core',
		'uglify',
		'less:dist',
		'fileblocks:dist'
	]);

};