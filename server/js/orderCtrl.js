angular.module('myapp').controller('OrderCtrl', function ($scope, $state, factory, basket) {
    
    $scope.basket = basket;
    $scope.disabled = true;
    
    $scope.submitForm = function() {
        factory.sendOrder(basket, {
            phone: $scope.phone,
            street: $scope.street,
            remarks: $scope.remarks
        }).then(function (res) {
            basket.content = {};
            $state.go('status', {orderId: res.data.id});
        });
    };
    
    $scope.back = function () {
        window.history.back();
    };
    
    $scope.validation = function () {
        if($scope.orderForm.phone.$valid && $scope.orderForm.street.$valid) {
            $scope.disabled = false;
        } else {
            $scope.disabled = true;
        }
    };
});