;(function() {
	'use strict';

	var app = window.app;
	var API = '/filter/get/';

	app.controller('sendCtrl', ['$scope','$http',function($scope,$http){
		$scope.message='Enter a valid Hashtag';
		$scope.showError=null;
		$scope.nonameHT='#lol';
		$scope.tweetsData;
		$scope.tweets=[];
		$scope.dateFrom = new Date(2015, 10, 1);
		$scope.dateTo = new Date();

		$scope.onPressHT = function(){
      $scope.load = true;
			$http.post(API, {hashtag: $scope.nonameHT, from: $scope.dateFrom, to: $scope.dateTo}).then(function successCallback(response){
        console.log(response);
        $scope.load = false;
        if(response.data && response.data.err){
          $scope.message = response.data.err;
        }else{
  				$scope.zones = response.data;
        }
			}, function errorCallback (response){
			});
		};

		$scope.onChange = function(){
			if(!$scope.nonameHT){
				$scope.message = 'Enter Hashtag';
				$scope.showError = true;
			}else if(!/^#[a-zA-Z0-9]*$/.test($scope.nonameHT)){
				$scope.message = 'Enter a valid Hashtag';
				$scope.showError = true;
			}else{
				$scope.showError = false;
			}
		};

	}]);
})();
