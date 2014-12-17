angular.module('myApp.services.comment', ['ngResource'])
.factory('Comment', ['$resource', 'API_URL', function($resource, API_URL)
{
	return $resource(API_URL+'/Comments', {id:'@id'},
	//return $resource('http://api.tracker.md:3000/api/Products/:id/comments', {id:'@id'},
	{
		fromProduct: {method:'GET', isArray:true, url:API_URL+'/Products/:id/comments', params:{id:'@id'}}
	});
}]);
