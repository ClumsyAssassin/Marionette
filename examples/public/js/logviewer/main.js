/**
 * Log Viewer Marionette Application
 */
var LogViewer = {};

LogViewer.App = new Backbone.Marionette.Application();

/**
 * Region Management
 */
LogViewer.App.addRegions({
	mainRegion : '#content-main',
	mainToolbar : '#content-toolbar'
});

/**
 * Model and Collection Management
 */
LogViewer.LogModel = Backbone.Model.extend({});

LogViewer.EnvironmentModel = Backbone.Model.extend({
	defaults : {
		environment : 'null',
		applications : []
	},
	initialize : function(options) {
		if (_.isArray(options.applications)) {
			this.applications = options.applications.sort();
		}
	}
});

LogViewer.FileLogCollection = Backbone.Collection.extend({
	model : LogViewer.LogModel,
	url : '/file/log'
})

LogViewer.PaginatedLogCollection = Backbone.Paginator.requestPager.extend({
	model : LogViewer.LogModel,
	defaults: {
		
	},
	paginator_core : {
		dataType : 'json',
		url : '/request/log'
	},
	paginator_ui : {
		firstPage : 1,
		currentPage : 1,
		perPage : 2,
		totalPages : 5,
		environment : "all",
		application : "all",
		getCount : false
	},
	server_api : {
		'perPage' : function() {
			return this.perPage;
		},
		'page' : function() {
			return this.currentPage;
		},
		'environment' : function() {
			return this.environment;
		},
		'application' : function() {
			return this.application
		},
		'getCount' : function() {
			if (this.currentPage == 1) {
				return true;
			} else {
				return false;
			}
		}
	},
	parse : function(response) {
		if (_.isNumber(response.total)) {
			this.totalPages = Math.floor(response.total / this.perPage);
		}

		return response.logs;
	}
});

LogViewer.EnvironmentCollection = Backbone.Collection.extend({
	model : LogViewer.EnvironmentModel,
	url : "/environment",
	comparator : function(model) {
		return model.get('environment');
	}
});

/**
 * Log List Views Management
 */
LogViewer.LogView = Backbone.Marionette.ItemView.extend({
	template : '#requestLogItem-template',
	tagName : 'tr',
	templateHelpers : {
		fullEnvironment : function() {
			if (_.isString(this.application)) {
				return this.environment + "." + this.application;
			} else {
				return this.environment;
			}
		}
	}
});

LogViewer.LogListBaseView = Backbone.Marionette.CollectionView.extend({
	itemView: LogViewer.LogView
});

LogViewer.LogListView = Backbone.Marionette.CompositeView.extend({
	template : '#requestLogList-template',
	tagName : 'div',
	itemView : LogViewer.LogView,
	appendHtml : function(collectionView, itemView) {
		collectionView.$("tbody").append(itemView.el);
	}, events: {
		'click .js-showMore' : 'showMore'
	},
	showMore : function(e) {
		this.collection.requestNextPage({remove: false});
		if(this.collection.currentPage >= this.collection.totalPages) {
			this.render();
		}
	},
	serializeData : function() {
		var viewData = {
			currentPage: this.collection.currentPage,
			totalPages: this.collection.totalPages
		};
		return viewData;
	}
});


LogViewer.EnvironmentListView = Backbone.Marionette.ItemView.extend({
	template : '#requestLogToolbar-environmentList-template',
	tagName : 'li',
	className : 'dropdown-submenu',
	onRender : function() {
		var exists = ($(this.el).find('ul.dropdown-menu').length != 0) ? true : false;
		if (!exists) {
			$(this.el).removeClass('dropdown-submenu');
		}
	}
});

LogViewer.LogListToolbarView = Backbone.Marionette.CompositeView.extend({
	template : '#requestLogToolbar-template',
	tagName : 'div',
	className : 'btn-toolbar',
	itemView : LogViewer.EnvironmentListView,
	appendHtml : function(collectionView, itemView) {
		collectionView.$("ul.js-environmentList").append(itemView.el);
	}
});

/**
 * File Log List Views Management
 */
LogViewer.FileLogView = Backbone.Marionette.ItemView.extend({
	template : '#fileLogItem-template',
	tagName : 'tr'
});

LogViewer.FileLogView = Backbone.Marionette.CompositeView.extend({
	template : '#fileLogList-template',
	tagName : 'table',
	className : 'table',
	itemView : LogViewer.FileLogView,
	appendHtml : function(collectionView, itemView) {
		collectionView.$("tbody").append(itemView.el);
	}
});

LogViewer.FileLogListToolbarView = Backbone.Marionette.ItemView.extend({
	template : '#fileLogToolbar-template',
	tagName : 'div',
	className : 'btn-toolbar'
});

/**
 * Router and Controllers
 */

LogViewer.LogViewerController = {
	requestLogs : function() {
		var logs = new LogViewer.PaginatedLogCollection();
		var environments = new LogViewer.EnvironmentCollection();
		logs.fetch({
			cache : false
		});
		environments.fetch({
			cache : false
		});

		var logListView = new LogViewer.LogListView({
			collection : logs
		});

		var logListToolbarView = new LogViewer.LogListToolbarView({
			collection : environments
		});

		LogViewer.App.mainRegion.show(logListView);
		LogViewer.App.mainToolbar.show(logListToolbarView);
	},
	fileLogs : function() {
		var fileLogs = new LogViewer.FileLogCollection();
		fileLogs.fetch({
			cache : true
		});

		var fileLogListView = new LogViewer.FileLogView({
			collection : fileLogs
		});
		var fileLogListToolbarView = new LogViewer.FileLogListToolbarView();

		LogViewer.App.mainRegion.show(fileLogListView);
		LogViewer.App.mainToolbar.show(fileLogListToolbarView);
	}
};

LogViewer.Router = Backbone.Marionette.AppRouter.extend({
	appRoutes : {
		'file' : 'fileLogs',
		'request' : 'requestLogs',
		'*actions' : 'requestLogs'
	},
	controller : LogViewer.LogViewerController
});

LogViewer.App.addInitializer(function(options) {
	LogViewer.router = new LogViewer.Router({
		options : options
	});
});

LogViewer.App.on("initialize:after", function() {
	if (Backbone.history) {
		Backbone.history.start();
	}
});

/**
 * Main document
 */
$(document).ready(function() {
	LogViewer.App.start();
});
