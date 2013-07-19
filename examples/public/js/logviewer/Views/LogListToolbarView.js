define(['jquery', 'marionette', 'Views/EnvironmentListView', 'tpl!Templates/RequestLogToolbarTemplate.html'], function($, Marionette, EnvironmentListView, RequestLogToolbarTemplate) {
	var LogListToolbarView = Marionette.CompositeView.extend({
		template : RequestLogToolbarTemplate,
		tagName : 'div',
		className : 'btn-toolbar',
		itemView : EnvironmentListView,
		appendHtml : function(collectionView, itemView) {
			collectionView.$("ul.js-environmentList").append(itemView.el);
		}
	});
	return LogListToolbarView;
});
