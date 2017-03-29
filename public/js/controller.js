var app = angular.module('myApp',[]);

app.controller('mainController', ['$scope','$http','$q', function($scope, $http,$q){
	$scope.daterange = '';
	$scope.test = 1;
	$scope.test2 = {};
	$scope.PostDataResponse = {};
	$scope.ResponseDetails = {};
	$scope.idList = {};
	$scope.currentId = "all";
	$scope.charts = [];
	$scope.unique = [];
	$scope.test1 = [];
	$scope.dataPoints = [];


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
	/*
	var options =     {
          "caption": "Tweet Sentiment vs Avg Air Pressure",
          "subCaption": "IBM Bluemix Demo",
          "xAxisName": "Tweet Sentiment Score ",
          "yAxisName": "Avg Pressure(kPA) ",
          "theme": "fint"
         };
	*/
	$scope.buildCharts = function(types){
		
		var deferred = $q.defer();
		var allOptions = [];
		angular.forEach(types,function(type){
			var options = [];
			var option =     {
          			"caption": "Power Usage In range: ",
         			"subCaption": "Smartenit Data Demo",
          			"xAxisName": "Time",
          			"yAxisName": "KW",
          			"theme": "fint"
         		};
			options.push(option);
			data = [];
			angular.forEach($scope.PostDataResponse,function(dataPoint){
				if(dataPoint.type = type){
					var obj = {
						"label" : String(type) +" "+ String(dataPoint.datetime),
						"value" : String(dataPoint.value)
					};
					data.push(obj);
				};
			});
			options.push(data);
			options.push(type);
			allOptions.push(options);
			deferred.resolve(allOptions);
			//if(type = "hourMedian"){$scope.test1 = options};
			
		});
		return deferred.promise;
		
	};
	$scope.prepareData = function(data){
		var deferred = $q.defer();
		
	}
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
			
			return $scope.buildCharts(types);
		}).then(function(options){
				
			options.forEach(function(option){
				$scope.test1.push(option[1]);
				//makeChart(option[0], option[1], option[2]);
			});
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
