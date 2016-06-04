angular.module('myapp').controller('ContactCtrl', function ($scope, factory) {
   
   factory.getContact().then(function (res) {
       $scope.contact = res.data;
   });
});