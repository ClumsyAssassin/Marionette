require.config({
	baseUrl : 'public/',
	paths : {
		backbone : 'vendor/backbone',
		underscore : 'vendor/underscore',
		jquery : 'vendor/jquery',
		marionette : 'vendor/backbone.marionette',
		bootstrap : 'vendor/bootstrap/js/bootstrap',
		backbonePaginator : 'vendor/backbone.paginator',
		backboneFetch : 'vendor/backbone.fetch-cache',
		tpl : 'vendor/tpl'
	},
	shim : {
		jquery : {
			exports : 'jQuery'
		},
		underscore : {
			exports : '_'
		},
		backbone : {
			deps : ['jquery', 'underscore'],
			exports : 'Backbone'
		},
		marionette : {
			deps : ['jquery', 'underscore', 'backbone'],
			exports : 'Marionette'
		},
		bootstrap : {
			deps : ['jquery']
		},
		backbonePaginator : {
			deps : ['backbone'],
			exports : 'Backbone.Paginator'
		},
		backboneFetch : {
			deps : ['backbone']
		}
	}
});

define(['jquery', 'underscore', 'backbone', 'marionette', 'backbonePaginator', 'backboneFetch', 'tpl', 'bootstrap'], function() {
});
