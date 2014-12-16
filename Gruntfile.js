module.exports = function (grunt) {
	'use strict';

	require('time-grunt')(grunt);
	require('load-grunt-tasks')(grunt);

	// Project configuration.
	grunt.initConfig({

		config: {
			src: 'public/angular',
			assets: '',
			bowerjs: 'public/bower_components',
			footer: 'views/index.ejs',
		},

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

		fileblocks: {
			options: {
				rebuild: true
			},
			dev: {
				files: [
					{
						src: '<%= config.footer %>',
						blocks: {
							'dev': {
								src: [
									'<%= config.bowerjs %>/angular/angular.js',
									'<%= config.bowerjs %>/angular-resource/angular-resource.js',
									'/socket.io/socket.io.js', //this is a virtual path
									'<%= config.bowerjs %>/angular-socket-io/socket.js',

									'<%= config.src %>/app.js',
									'<%= config.src %>/services/*.js',
									'<%= config.src %>/controllers/*.js'
								],
								//prefix: ''
							}
						}
					}
				]
			},
			
		},


	});

	// tasks
	grunt.registerTask('dev-js', [
		'jshint',
		'fileblocks'
	]);

};