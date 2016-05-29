angular.module('myapp', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /main
    $urlRouterProvider.otherwise("/main");
    //
    // Now set up the states
    $stateProvider
    .state('main', {
        url: "/main",
        controller: "MainCtrl",
        templateUrl: "parts/main.html"
    })
    .state('order', {
        url: "/order",
        controller: "OrderCtrl",
        templateUrl: "parts/order.html"
    })
    .state('status', {
        url: "/status/:orderId",
        controller: "StatuCtrl",
        templateUrl: "parts/status.html"        
    })
    .state('contact', {
        url: "contact",
        controller: "ContactCtrl",
        templateUrl: "parts/contact.html"
    })
});
