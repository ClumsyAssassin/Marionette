define(['jquery', 'marionette', 'Views/LogView', 'tpl!Templates/RequestLogListTemplate.html'], function($, Marionette, LogView, RequestLogListTemplate) {
	var LogListView = Marionette.CompositeView.extend({
		template : RequestLogListTemplate,
		tagName : 'div',
		itemView : LogView,
		appendHtml : function(collectionView, itemView) {
			collectionView.$("tbody").append(itemView.el);
		},
		events : {
			'click .js-showMore' : 'showMore'
		},
		showMore : function(e) {
			this.collection.requestNextPage({
				remove : false
			});
			if (this.collection.currentPage >= this.collection.totalPages) {
				this.render();
			}
		},
		serializeData : function() {
			var viewData = {
				currentPage : this.collection.currentPage,
				totalPages : this.collection.totalPages
			};
			return viewData;
		}
	});
	return LogListView;
});
