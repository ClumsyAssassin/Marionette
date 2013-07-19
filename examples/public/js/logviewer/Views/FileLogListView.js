define(['jquery', 'marionette', 'Views/FileLogView', 'tpl!Templates/FileLogListTemplate.html'], function($, Marionette, FileLogView, FileLogListTemplate) {
	var FileLogListView = Marionette.CompositeView.extend({
		template : FileLogListTemplate,
		tagName : 'table',
		className : 'table',
		itemView : FileLogView,
		appendHtml : function(collectionView, itemView) {
			collectionView.$("tbody").append(itemView.el);
		}
	});
	return FileLogListView;
}); 