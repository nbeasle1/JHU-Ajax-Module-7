(function () {

    'use strict';

    angular.module('ShoppingListCheckOff', [])
    
    // controllers & services
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
    .filter('price', PriceFilterFactory);

    // to buy controller
    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var tobuyctrl = this; 

        // display to buy items
        tobuyctrl.items = ShoppingListCheckOffService.getToBuyItems();

        // move items to bought
        tobuyctrl.moveFromToBuy = function (itemIndex) {
            ShoppingListCheckOffService.moveFromToBuy(itemIndex);
        };


    }

    // already bought controller
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var alreadyboughtctrl = this; 
        
        // get items
        alreadyboughtctrl.items = ShoppingListCheckOffService.getBoughtItems();

    }


    function ShoppingListCheckOffService() {
        var service = this; 

        // initial arrays
        var toBuyItems = [
            { name: "cookies", quantity: "10", pricePerItem: "2"}, 
            { name: "tomatoes", quantity: "1", pricePerItem: "6"}, 
            { name: "onions", quantity: "11", pricePerItem: "5"}, 
            { name: "salsa", quantity: "3", pricePerItem: "7"}, 
            { name: "chips", quantity: "1", pricePerItem: "3"}
        ];

        var boughtItems = [];
        
        // move items from to buy to bought
        service.moveFromToBuy = function (itemIndex) {
            // note that splice returns an array (but it will always be length-1), so we have to reference index
            var itemsbought = toBuyItems.splice(itemIndex, 1)[0];
            boughtItems.push(itemsbought);
        };

        // expose to outside 
        service.getToBuyItems = function () {
            return toBuyItems;
        };

        // expose to outside 
        service.getBoughtItems = function () {
            return boughtItems;
        };
    }

    // filter to return string given item object
    function PriceFilterFactory() {
        return function (item) {
            return `Bought ${item.quantity} of ${item.name} for total price of $$$${item.quantity * item.pricePerItem}.00`;
        }
    }



})();