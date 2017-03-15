var app = angular.module('dateapp',[]);

app.controller('MainCtrl', ['$scope', 'averages',function($scope, averages){
	$scope.date = date.range;
	this.getAvg = function(date){
		averages.getAvg(date).success(function(data){
			alert(data)
		}).error(function(){
			alert('something went wrong');
		});
	}

}]);
