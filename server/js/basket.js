angular.module('myapp').service('basket', function () {
    
    var basket = this;
    basket.content = [];
   
   basket.addItem = function (pizza) {
        var index = basket.content.indexOf(pizza);
        
        if (index == -1) {
            pizza.quantity = 0;
            basket.content.push(pizza);
            index = basket.content.indexOf(pizza);
        }
        basket.content[index].quantity += 1;
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
       return total;
   };
});