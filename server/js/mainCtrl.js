angular.module('myapp').controller('MainCtrl', function ($scope, factory, basket) {
    
    $scope.menu = [];
    $scope.basket = basket;
    
    factory.getMenu().then( function (menu) {
        $scope.menu = menu;
    });
    
    factory.getIngredients().then(function (res) {
        $scope.ingredients = res.data;
    });
    
    $scope.printIngreditents = function (item) {
        return (item.ingredients.map(function (x) {
            return x.label;
        })).join(', ');
    };
});