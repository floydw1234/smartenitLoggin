app.service('averages', ['$http', function($http){
	this.getAvg = function(range){
		 return http.post({method: POST, url:'/valuesInRange',data: range})
		.success(function(data){
			return data;
		})
		.error(function(err){
			return err;
		});
	}
}]);
