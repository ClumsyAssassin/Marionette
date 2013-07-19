define(['marionette', 'Views/LogView'], function(Marionette, LogView) {
	var LogListBaseView = Marionette.CollectionView.extend({
		itemView : LogView
	});
	return LogListBaseView;
}); 