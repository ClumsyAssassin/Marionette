define(['marionette', 'tpl!Templates/FileLogItemTemplate.html'], function(Marionette, FileLogItemTemplate) {
	var FileLogView = Marionette.ItemView.extend({
		template : FileLogItemTemplate,
		tagName : 'tr'
	});
	return FileLogView;
});