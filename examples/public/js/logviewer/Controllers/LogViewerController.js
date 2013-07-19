define(['Collections/PaginatedLogCollection', 'Collections/EnvironmentCollection', 'Views/LogListView', 'Views/LogListToolbarView', 'Collections/FileLogCollection', 'Views/FileLogListView', 'Views/FileLogListToolbarView'], function(PaginatedLogCollection, EnvironmentCollection, LogListView, LogListToolbarView, FileLogCollection, FileLogListView, FileLogListToolbarView) {
	var LogViewerController = {
		requestLogs : function() {
			var logs = new PaginatedLogCollection();
			var environments = new EnvironmentCollection();
			logs.fetch({
				cache : false
			});
			environments.fetch({
				cache : false
			});

			var logListView = new LogListView({
				collection : logs
			});

			var logListToolbarView = new LogListToolbarView({
				collection : environments
			});

			window.LogViewerApp.mainRegion.show(logListView);
			window.LogViewerApp.mainToolbar.show(logListToolbarView);
		},
		fileLogs : function() {
			var fileLogs = new FileLogCollection();
			fileLogs.fetch({
				cache : false,
			});

			var fileLogListView = new FileLogListView({
				collection : fileLogs
			});
			var fileLogListToolbarView = new FileLogListToolbarView();

			window.LogViewerApp.mainRegion.show(fileLogListView);
			window.LogViewerApp.mainToolbar.show(fileLogListToolbarView);
		}
	};
	return LogViewerController;
});
