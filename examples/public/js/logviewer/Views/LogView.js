define(['underscore', 'marionette', 'tpl!Templates/RequestLogListItemTemplate.html'], function(_, Marionette, RequestLogItemTemplate) {
	var LogView = Marionette.ItemView.extend({
		template : RequestLogItemTemplate,
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
	return LogView;
});
