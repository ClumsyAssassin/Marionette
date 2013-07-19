define(['marionette', 'Controllers/LogViewerController'], function(Marionette, LogViewerController) {
	var Router = Marionette.AppRouter.extend({
		appRoutes : {
			'file' : 'fileLogs',
			'request' : 'requestLogs',
			'*actions' : 'requestLogs'
		},
		controller : LogViewerController
	});
	return Router;
}); 