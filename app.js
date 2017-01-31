 //module
var app= angular.module('myApp',['ui.router','ngResource']);

//routes
app.config(function($stateProvider, $urlRouterProvider){
	
	$urlRouterProvider.otherwise('/home');
    
    $stateProvider
	.state('home', {
		url:'/home',
		templateUrl:'pages/home.html',
		controller:'home'
	}
	)
	.state('forecast',{
		url:'/forecast/:days',
		templateUrl:'pages/forecast.html',
		controller:'forecast'

	})
	.state('shop',{
	url:'/shopui',
	templateUrl:'pages/shopui.html',
	controller:'shop'
	 })
})
app.service('happy',function(){
this.gubbu = 'New York, NY';
});

app.controller('home',function($scope, happy){
 $scope.bozi=happy.gubbu;
 
 $scope.$watch('bozi',function(){
 	happy.gubbu = $scope.bozi;
 })
});

app.controller('forecast',function($scope, happy,$resource,$stateParams){
	$scope.bozi = happy.gubbu;
	$scope.weatherAPI = $resource('http://api.openweathermap.org/data/2.5/forecast/daily?q=London&cnt=7',
	 { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" } });
	$scope.puppu=$scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days });
// $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?q=London&&cnt=/APPID=278b30a4edae77c0093cdd234aba9e68",
//       { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" } });
// $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days });
	$scope.days= $stateParams.days || '7';
});

app.controller('shop',function($scope){
$scope.name = 'Hello World';

});

app.directive('forecastDir',function(){
	return{
		
		restrict:'E',
		templateUrl:'forecastDir.html',
		scope: {
			temp: '=',
			meethu: '&',
			khattu:'&',
			string:'@'
		}
	}
});