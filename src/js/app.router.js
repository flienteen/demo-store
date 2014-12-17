
angular.module('myApp')
.config(['$stateProvider', function($stateProvider)
{
	// Home state
	$stateProvider
		.state("home", {
			url: "/",
			title: 'My Store App',
			templateUrl: "/partials/home.html"
		});

	// Set up the states
	$stateProvider
		.state('products', {
			abstract: true,
			url: '/products',
			templateUrl: '/partials/products.html',
			resolve: {
				products: ['Product', function(Product){ return Product.query().$promise; }]
			},
			controller: 'ProductsList'
		})
		.state('products.list', {
			url: '',
			title: 'All phones',
			templateUrl: '/partials/productsList.html'
		})
		.state('products.detail', {
			url: '/{productId:[0-9]{1,4}}',
			templateUrl: '/partials/productsDetail.html',
			resolve: {
				product: ['Product', '$stateParams',
					function(Product, $stateParams)
					{
						return Product.get({id:$stateParams.productId}).$promise;
					}],
				comments: ['Comment', '$stateParams',
					function(Comment, $stateParams)
					{
						return Comment.fromProduct({id:$stateParams.productId}).$promise;
					}],
				productId: ['$stateParams', function($stateParams)
				{
					return $stateParams.productId;
				}]
			},
			controller: 'ProductDetail'
		})
		.state('products.add', {
			url: '/add',
			title: 'Add a new phone',
			templateUrl: '/partials/productsAdd.html',
			controller: 'ProductAdd'
		})
	;


}]);

