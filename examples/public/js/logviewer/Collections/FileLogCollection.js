define(['backbone', 'Models/LogModel'], function(Backbone, LogModel) {
	var FileLogCollection = Backbone.Collection.extend({
		model : LogModel,
		url : '/file/log'
	})
	return FileLogCollection;
});
