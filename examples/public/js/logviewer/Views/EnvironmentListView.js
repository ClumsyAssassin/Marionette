define(['jquery', 'marionette', 'tpl!Templates/RequestLogToolbarEnvironmentListTemplate.html'], function($, Marionette, RequestLogToolbarEnvironmentListTemplate) {
	var EnvironmentListView = Marionette.ItemView.extend({
		template : RequestLogToolbarEnvironmentListTemplate,
		tagName : 'li',
		className : 'dropdown-submenu',
		onRender : function() {
			var exists = ($(this.el).find('ul.dropdown-menu').length != 0) ? true : false;
			if (!exists) {
				$(this.el).removeClass('dropdown-submenu');
			}
		}
	});
	return EnvironmentListView;
}); 