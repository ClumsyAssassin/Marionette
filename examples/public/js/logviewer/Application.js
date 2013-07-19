define(['backbone', 'marionette', 'Router'], function(Backbone, Marionette, Router) {
	var App = new Marionette.Application();

	App.addRegions({
		mainRegion : '#content-main',
		mainToolbar : '#content-toolbar'
	});

	App.addInitializer(function(options) {
		new Router({
			options : options
		});
	});

	App.on("initialize:after", function() {
		if (Backbone.history) {
			Backbone.history.start();
		}
	});

	return {
		start : function() {
			window.LogViewerApp = App;
			App.start();
		}
	};
});
