angular.module('myapp').controller('StatusCtrl', function ($scope, $state, $stateParams, factory) {
    
    $scope.orderId = $stateParams.orderId;
    
    $scope.orderStatus;
    
    factory.getStatus($stateParams.orderId).then( function (res) {
        $scope.orderStatus = res.data;
    });
});