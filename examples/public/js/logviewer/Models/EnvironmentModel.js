define(['underscore', 'backbone'], function(_, Backbone) {
	var EnvironmentModel = Backbone.Model.extend({
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
	return EnvironmentModel;
}); 