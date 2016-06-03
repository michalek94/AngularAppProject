angular.module('myapp').service('basket', function () {
    
    var basket = this;
    basket.content= {};
   
   basket.addItem = function (item) {
       if(!(item.id in basket.content)) {
           item.quantity = 0;
           basket.content[item.id] = item;
       }
       basket.content[item.id].quantity += 1;
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
           var item = basket.content[id];
           total += item.quantity * item.price;
       }
       return total;
   };
});