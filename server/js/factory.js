angular.module('myapp').factory('factory', ['$http', '$q', function($http, $q) {
    
    var factory = {};
    
    factory.getMenu = function () {
        return $q.all({
            'menu': $http.get('./menu'),
            'ingredients': $http.get('./ingredients')
        }).then(function (res) {
            var menu = res.menu.data;
            var ingredients = res.ingredients.data;
            
            for(var id in menu) {
                var pizza = menu[id];
                for(var tabId in pizza.ingredients) {
                    var ingredientsId = pizza.ingredients[tabId];
                    pizza.ingredients[tabId] = ingredients.find( function(a) {
                        return a.id === ingredientsId;
                    });
                }
            }
            return menu;
        });
    };
    
    factory.getIngredients = function () {
        return $http.get('./ingredients');
    };
    
    factory.getStatus = function(orderId) {
        return $http.get('./order/' + orderId);
    };
    
    factory.getContact = function () {
        return $http.get('/contact');  
    };
    
    factory.sendOrder = function(basket, form) {
        var order = {
            order: [],
            extras: [],
            orderInfo: {}
        };
        
        Object.keys(basket.content).map(function (key) {return basket.content[key];})
        .forEach(function(pizza) {
            order.order.push({
                id: pizza.id,
                quantity: pizza.quantity
            });
        });
        
        order.orderInfo = form;
        
        return $http.post('/order', order);
    };
    
    return factory;
}]);