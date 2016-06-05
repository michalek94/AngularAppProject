angular.module('myapp').service('basket', function () {
    
    var basket = this;
    basket.content = [];
   
   basket.addItem = function (pizza) {
        if (!(pizza.id in basket.content)) {
            pizza.quantity = 0;
            basket.content[pizza.id] = pizza;
        }
        basket.content[pizza.id].quantity += 1;
    };
   
   basket.clearBasket = function (item) {
       if(basket.content[item.id].quantity <= 0) {
           delete basket.content[item.id];
       }
   };
   
   basket.empty = function () {
       return angular.equals({}, basket.content);
   };
   
   basket.getBasket = function () {
       var total = 0;
       for(var id in basket.content) {
           var pizza = basket.content[id];
           total += pizza.quantity * pizza.price;
       }
       return total.toFixed(2);
   };
});