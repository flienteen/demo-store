angular.module('myApp.services.product', ['ngResource'])
.factory('Product', ['$resource', 'API_URL', function($resource, API_URL)
{
	return $resource(API_URL+'/Products/:id', {id:'@id'},
	{
		query: {method:'GET', isArray:true}
	});
}]);
