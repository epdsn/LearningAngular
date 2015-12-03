(function () {
    //Product List Controller 
    "use strict";

    // Registers productListCtrl (component / controller) to the main module, productManagement.
    angular
        .module("productManagement")
        .controller("ProductListCtrl",
            [ "productResource" , ProductListCtrl]);

    function ProductListCtrl(productResource) {
        var vm = this;

        // get data and assign data to the model
        // Calling the Query method on the productResource service to get the data.
        productResource.query(function (data) {
            vm.products = data;
        });

        //vm.products = [
        //   {
        //       "productId": 1,
        //       "productName": "Leaf Rake",
        //       "productCode": "GDN-0011",
        //       "releaseDate": "March 19, 2009",
        //       "description": "Leaf rake with 48inch handle",
        //       "cost": 9.00,
        //       "price": 19.95,
        //       "category": "garden",
        //       "tags": ["leaf", "tool"],
        //       "imageUrl": "http://www.claringtonforge.com/media/catalog/product/cache/1/image/650x/9df78eab33525d08d6e5fb8d27136e95/i/m/image_54.jpg"
        //   },
        //   {
        //       "productId": 5,
        //       "productName": "Hammer",
        //       "productCode": "TBX-234",
        //       "releaseDate": "May 21, 2013",
        //       "description": "Curved claw steel hammer",
        //       "cost": 1.00,
        //       "price": 8.99,
        //       "category": "toolbox",
        //       "tags": ["tool"],
        //       "imageUrl": "http://pngimg.com/upload/hammer_PNG3890.png"
        //   }];

        vm.showImage = false;

        vm.toggleImage = function() {
            vm.showImage = !vm.showImage;
        }

    }

}());