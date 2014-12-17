
angular.module('myApp.controllers.product', [])

.controller('ProductsList', ['$scope', 'products',
	function ($scope, products)
	{
		$scope.products = products;
	}
])

.controller('ProductDetail', ['$scope', 'product', 'comments', 'Comment', 'productId', '$state',
	function ($scope, product, comments, Comment, productId, $state)
	{
		$state.current.title = product.name+' details';
		$scope.product = product;
		$scope.comments = comments;
		$scope.inputContent = '';

		$scope.addComment = function()
		{
			if(!$scope.inputContent.length) return;

			var newComment = new Comment({content: $scope.inputContent, productId:productId});
			newComment.$save();
			$scope.comments.push(newComment);
			$scope.inputContent = '';
		};
	}
])

.controller('ProductAdd', ['$scope', '$state', 'Product',
	function($scope, $state, Product)
	{
		$scope.product = {};
		$scope.addProduct = function()
		{
			var newProduct = new Product($scope.product);
			newProduct.$save(function(data)
			{
				$state.go('products.detail', {productId:data.id});
			});
			$scope.product = {};
		};
	}
])
;

