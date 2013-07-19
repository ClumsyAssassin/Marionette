define(['backbone', 'Models/EnvironmentModel'], function(Backbone, EnvironmentModel) {
	var EnvironmentCollection = Backbone.Collection.extend({
		model : EnvironmentModel,
		url : "/environment",
		comparator : function(model) {
			return model.get('environment');
		}
	});
	return EnvironmentCollection;
})
