/**
 * Log Viewer Marionette Application 
 */
var LogViewer = {};

LogViewer.App = new Backbone.Marionette.Application();

/**
 * Region Management 
 */
LogViewer.App.addRegions({
	mainRegion: '#content-main'
});

/**
 * Model and Collection Management 
 */
LogViewer.LogModel = Backbone.Model.extend({});

LogViewer.LogCollection = Backbone.Collection.extend({
	model: LogViewer.LogModel
});


/**
 * Views Management 
 */
LogViewer.LogView = Backbone.Marionette.ItemView.extend({
	template: '#requestLogItem-template',
	tagName: 'tr'
});

LogViewer.LogListView = Backbone.Marionette.CompositeView.extend({
	template: '#requestLogList-template',
	tagName: 'table',
	className: 'table',
	itemView: LogViewer.LogView,
	appendHtml: function(collectionView, itemView) {
		collectionView.$("tbody").append(itemView.el);
	}
});

LogViewer.App.addInitializer(function(options) {
	var logListView = new LogViewer.LogListView({
		collection: options.logs
	});
	LogViewer.App.mainRegion.show(logListView);
});

$(document).ready(function(){
	var logs = new LogViewer.LogCollection([
		{id: 1, environment: 'robert.Idmgmt', lineCount: 50, dateCreated: '2013-01-01 10:00:00'},
		{id: 2, environment: 'robert.Idmgmt', lineCount: 25, dateCreated: '2013-01-01 10:00:00'},
		{id: 3, environment: 'robert.Idmgmt', lineCount: 30, dateCreated: '2013-01-01 10:00:00'},
		{id: 4, environment: 'robert.Idmgmt', lineCount: 20, dateCreated: '2013-01-01 10:00:00'},		
	]);
	
	LogViewer.App.start({logs: logs});
});


