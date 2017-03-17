var app = angular.module('myApp',[]);

app.controller('mainController', ['$scope',function($scope){
	$scope.hi = 'things';
/*
	this.getAvg = function(date){
		averages.getAvg(date).success(function(data){
			alert(data)
		}).error(function(){
			alert('something went wrong');
		});
	}
*/

}]);
