;(function() {
	'use strict';

	var app = window.app;
	var API = 'http://localhost:1337/filter/get/{HT}';

	app.controller('sendCtrl', ['$scope','$http',function($scope,$http){
		$scope.message='Enter a valid Hashtag';
		$scope.showError=null;
		$scope.nonameHT='';
		$scope.tweetsData;
		$scope.tweets=[];
		$scope.dateTo;
		$scope.dateFrom;

		$scope.onPressHT = function(){
			$http({
				method:'GET',
				url:API.replace('{HT}',$scope.nonameHT)
			}).then(function successCallback(response){			
				$scope.tweetsData = response.data;
				$scope._getTweet($scope.tweetsData)
			}, function errorCallback (response){
				console.log(response.data);
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

		$scope._getTweet = function(tweetsData){
			tweetsData.map(function(tweet){
				console.log(tweet);
				$scope.tweets.push(tweet.tweets);
			})
		};

	}]);
})();