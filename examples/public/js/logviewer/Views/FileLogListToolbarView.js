define(['marionette', 'tpl!Templates/FileLogToolbarTemplate.html'], function(Marionette, FileLogToolbarTemplate) {
	var FileLogListToolbarView = Marionette.ItemView.extend({
		template : FileLogToolbarTemplate,
		tagName : 'div',
		className : 'btn-toolbar'
	});
	return FileLogListToolbarView;
}); 