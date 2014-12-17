
angular.module('myApp')
.value('API_URL', 'http://localhost:3000/api')
.config(['$urlRouterProvider', '$locationProvider', function($urlRouterProvider, $locationProvider)
{
	$locationProvider.html5Mode(true);

	// For any unmatched url, redirect to home state
	$urlRouterProvider.otherwise('/');
}]);

