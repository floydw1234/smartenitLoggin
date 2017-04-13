var app = angular.module('myApp',[]);

app.controller('mainController', ['$scope','$http','$q', function($scope, $http,$q){
	$scope.daterange = '';
	$scope.test = 1;
	$scope.test2 = [];
	$scope.PostDataResponse = {};
	$scope.ResponseDetails = {};
	$scope.idList = {};
	$scope.currentId = "all";
	$scope.charts = [];
	$scope.unique = [];
	$scope.test1 = [];
	$scope.data = [];


	$scope.buildList = function(postData){
		var deferred = $q.defer();
		var types = [];
		angular.forEach(postData, function(thing){
			types.push(thing.type);	
		});
			if (postData.length == types.length){
				$scope.uniqueArray(types);
				deferred.resolve($scope.unique);
			}
		return deferred.promise;
	};
	$scope.buildCharts = function(){
		
		var promises = [];
		
		$scope.unique.forEach(function(type){
					var deferred = $q.defer();
					$scope.prepareData(type);
					var option =[
					{
			  			title: type+" kWh Demand",
			  			//curveType: 'function',
			  			legend: { position: 'bottom' }
					},type];
					deferred.resolve(option);
					promises.push(deferred.promise);
		});
		return $q.all(promises);
	};

	$scope.prepareData = function(type){
		var deferred = $q.defer();
		var promises = [];
		//deferred.resolve(['timeStamp', type]);
		//promises.push(deferred.promise);
		$scope.PostDataResponse.forEach(function(response){
			var deferred = $q.defer();
			if ( type == response.type){
				deferred.resolve([new Date(response.timeStamp*1000),response.value*100000]);
				promises.push(deferred.promise);
			}
		});
		return $q.all(promises).then(function(data){
			$scope.data.push(data);
		});
		
	};
	$scope.uniqueArray = function(charts){
		var unique = charts.filter(function(elem, index, self) {
   			return index == self.indexOf(elem);
		});
		$scope.unique = unique;
	};
	$scope.post = function(){
		var deferred = $q.defer();	
		var data = {
		        range: $scope.daterange,
			id: $scope.currentId
		};
		$http.post('/valuesInrange', data)
		.success(function (data, status, headers, config) {
		        deferred.resolve(data);
			
			$scope.PostDataResponse = data;
		})
			.error(function(data,status,headers,config){
			$scope.ResponseDetails = JSON.stringify({data: data});
		});
		$scope.unique = [];//this is to clear the old charts for a new query
		$scope.PostDataResponse = {}; // this is to clear data from other query
		$scope.data = [];
		return deferred.promise;
	};

	
	$scope.SendData = function () {
		$scope.post().then(function(post){

			return $scope.buildList(post);
		}).then(function(types){
			return $scope.buildCharts(types);
		}).then(function(options){

				$scope.test1 = options;
				$scope.test2 = [['timeStamp', $scope.unique[1]]].concat($scope.data[1]);
				$scope.test3 = String($scope.unique[1]);
			setTimeout(function(){
				drawChart(options[0][0],[['timeStamp', $scope.unique[0]]].concat($scope.data[0]),options[0][1]);
				drawChart(options[1][0],[['timeStamp', $scope.unique[1]]].concat($scope.data[1]),options[1][1]);
				drawChart(options[2][0],[['timeStamp', $scope.unique[2]]].concat($scope.data[2]),options[2][1]);
				drawChart(options[3][0],[['timeStamp', $scope.unique[3]]].concat($scope.data[3]),options[3][1]);
				drawChart(options[4][0],[['timeStamp', $scope.unique[4]]].concat($scope.data[4]),options[4][1]);
				drawChart(options[5][0],[['timeStamp', $scope.unique[5]]].concat($scope.data[5]),options[5][1]);
				drawChart(options[6][0],[['timeStamp', $scope.unique[6]]].concat($scope.data[6]),options[6][1]);
				drawChart(options[7][0],[['timeStamp', $scope.unique[7]]].concat($scope.data[7]),options[7][1]);
			},600);
			
		});		
        };


	$scope.getIds = function(){
	    $http.get('/idList')
		.success(function(data){
			$scope.idList = data.ids;
	    })
		.error(function(data,status,headers,config){
			$scope.ResponseDetails = JSON.stringify({data: data});
	    });
	};
	$scope.selectId = function(id){
		$scope.currentId = id;
	}
}]);
