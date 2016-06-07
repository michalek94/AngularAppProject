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
           delete basket.content[item];
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
   basket.isReadable = function(){
	   if(window.location.href != "http://localhost:8080/#/main")
	   {
		   console.log(window.location.href);
		   return true;
	   }
   }
   basket.removePizza = function(item)
   {
	   console.log(basket.content[item].id);
	   basket.content.splice(item,1);
	   delete basket.content[item];
	   
   }
});