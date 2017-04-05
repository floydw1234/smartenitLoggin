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
	$scope.buildCharts = function(types){
		
		var promises = [];
		
		$scope.unique.forEach(function(type){
					var deferred = $q.defer();
					$scope.prepareData(type);
					var option =
					{
			  			title: type,
			  			curveType: 'function',
			  			legend: { position: 'bottom' }
					};
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
				deferred.resolve([new Date(response.timeStamp*1000),response.value]);
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
		return deferred.promise;
	};

	
	$scope.SendData = function () {
		$scope.post().then(function(post){

			return $scope.buildList(post);
		}).then(function(types){
			//$scope.test1 = types;
			return $scope.buildCharts(types);
		}).then(function(options){

				$scope.test1 = {
			  			title: $scope.unique[3],
			  			curveType: 'function',
			  			legend: { position: 'bottom' }
					};
				$scope.test2 = [['timeStamp', $scope.unique[1]]].concat($scope.data[1]);
				$scope.test3 = String($scope.unique[1]);

				drawChart({
			  			title: $scope.unique[0],
			  			curveType: 'function',
			  			legend: { position: 'bottom' }
					},[['timeStamp', $scope.unique[0]]].concat($scope.data[0]),String($scope.unique[0]));
				
				drawChart({
			  			title: $scope.unique[1],
			  			curveType: 'function',
			  			legend: { position: 'bottom' }
					},[['timeStamp', $scope.unique[1]]].concat($scope.data[1]),$scope.unique[1]);
				drawChart({
			  			title: $scope.unique[2],
			  			curveType: 'function',
			  			legend: { position: 'bottom' }
					},[['timeStamp', $scope.unique[2]]].concat($scope.data[2]),$scope.unique[2]);
				drawChart({
			  			title: $scope.unique[3],
			  			curveType: 'function',
			  			legend: { position: 'bottom' }
					},[['timeStamp', $scope.unique[3]]].concat($scope.data[3]),$scope.unique[3]);
				drawChart({
			  			title: $scope.unique[4],
			  			curveType: 'function',
			  			legend: { position: 'bottom' }
					},[['timeStamp', $scope.unique[4]]].concat($scope.data[4]),$scope.unique[4]);
				drawChart({
			  			title: $scope.unique[5],
			  			curveType: 'function',
			  			legend: { position: 'bottom' }
					},[['timeStamp', $scope.unique[5]]].concat($scope.data[5]),$scope.unique[5]);
				drawChart({
			  			title: $scope.unique[6],
			  			curveType: 'function',
			  			legend: { position: 'bottom' }
					},[['timeStamp', $scope.unique[6]]].concat($scope.data[6]),$scope.unique[6]);
				drawChart({
			  			title: $scope.unique[7],
			  			curveType: 'function',
			  			legend: { position: 'bottom' }
					},[['timeStamp', $scope.unique[7]]].concat($scope.data[7]),$scope.unique[7]);
						
			
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
