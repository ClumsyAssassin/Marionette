define(['backbonePaginator', 'Models/LogModel'], function(Paginator, LogModel) {
	var PaginatedLogCollection = Paginator.requestPager.extend({
		model : LogModel,
		defaults : {

		},
		paginator_core : {
			dataType : 'json',
			url : '/request/log'
		},
		paginator_ui : {
			firstPage : 1,
			currentPage : 1,
			perPage : 2,
			totalPages : 5,
			environment : "all",
			application : "all",
			getCount : false
		},
		server_api : {
			'perPage' : function() {
				return this.perPage;
			},
			'page' : function() {
				return this.currentPage;
			},
			'environment' : function() {
				return this.environment;
			},
			'application' : function() {
				return this.application
			},
			'getCount' : function() {
				if (this.currentPage == 1) {
					return true;
				} else {
					return false;
				}
			}
		},
		parse : function(response) {
			if (_.isNumber(response.total)) {
				this.totalPages = Math.floor(response.total / this.perPage);
			}

			return response.logs;
		}
	});
	return PaginatedLogCollection;
});
