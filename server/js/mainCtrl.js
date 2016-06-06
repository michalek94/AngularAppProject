angular.module('myapp').controller('MainCtrl', function ($scope, factory, basket) {

    $scope.menu = []; 
    $scope.basket = basket;

    factory.getMenu().then( function (menu) {
        $scope.menu = menu;
    });

	$scope.go = function (path) {
	    window.location = path;
	};
});