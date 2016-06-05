angular.module('myapp').controller('StatusCtrl', function ($scope, $state, $stateParams, factory) {

    $scope.menu = {};
    $scope.orderStatus = {};
    
    factory.getStatus($stateParams.orderId).then(function (res) {
        $scope.orderStatus = res.data;
        
        factory.getMenu().then( function (res) {
            $scope.menu = res;
        });
    
        var timeLeft = (new Date($scope.orderStatus.estimated)).getTime() - Date.now();
        timeLeft = parseInt(timeLeft/1000/60);
        if(timeLeft > 0) {
            $scope.status = "Do doręczenia pizzy pozostało " + timeLeft + " minut.";
        } else {
            $scope.status = "Dziękujemy za zamówienie. Zapraszamy ponownie.";
        }
    });
    
    $scope.back = function() {
        $state.go('main');
    };    
});