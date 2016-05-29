angular.module('myapp').controller('ContactCtrl', function ($scope, factory) {
    
   $scope.contact;
   
   factory.getContact().then(function (res) {
       $scope.contact = res.data;
   });
});