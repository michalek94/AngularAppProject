angular.module('myapp').factory('factory', ['$http', 'var', function($http, $var) {
    
    var factory;
    
    factory.getMenu = function () {
        return $var.all({
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
        return $http.get('.contact');  
    };
    
    return factory;
}]);