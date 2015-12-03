(function () {
    "use strict";

    var app = angular
        // module name
        .module("productResourceMock",
                // dependencies array
                // allows for mock data to be used.
                ["ngMockE2E"]);

    // perform the initialization
    // executed when the module is loaded
    app.run(function ($httpBackend) {
        debugger;
        var products = [
           {
               "productId": 1,
               "productName": "Leaf Rake",
               "productCode": "GDN-0011",
               "releaseDate": "March 19, 2009",
               "description": "Leaf rake with 48inch handle",
               "cost": 9.00,
               "price": 19.95,
               "category": "garden",
               "tags": ["leaf", "tool"],
               "imageUrl": "http://www.claringtonforge.com/media/catalog/product/cache/1/image/650x/9df78eab33525d08d6e5fb8d27136e95/i/m/image_54.jpg"
           },
           {
               "productId": 2,
               "productName": "Xbox controller",
               "productCode": "XBX-548",
               "releaseDate": "Nov 1, 2015",
               "description": "Fun, fun, fun.",
               "cost": 20.00,
               "price": 59.99,
               "category": "games",
               "tags": ["controller"],
               "imageUrl": "http://compass.xbox.com/assets/ce/fd/cefdf44f-960a-4ea3-b2b3-5e86eb734aee.jpg?n=xbox-one-Forza-6-wireless-controller_hub-image_470x300.jpg"
           },
           {
               "productId": 3,
               "productName": "Nail",
               "productCode": "NAA-345",
               "releaseDate": "Oct 14, 2008",
               "description": "Touch as nails.",
               "cost": .50,
               "price": 1.99,
               "category": "toolbox",
               "tags": ["materials"],
               "imageUrl": "http://us.123rf.com/450wm/ammit/ammit1106/ammit110600039/9794146-single-wood-nail-isolated-on-white-with-shallow-depth-of-field-studio-shoot.jpg"
           },
           {
               "productId": 5,
               "productName": "Hammer",
               "productCode": "TBX-234",
               "releaseDate": "May 21, 2013",
               "description": "Curved claw steel hammer",
               "cost": 1.00,
               "price": 8.99,
               "category": "toolbox",
               "tags": ["tool"],
               "imageUrl": "http://pngimg.com/upload/hammer_PNG3890.png"
           }];

        // define fake responses url used
        var productUrl = "/api/products"


        // GET Data
        // what happens when a GET request is sent to this url
        // return full list of products
        $httpBackend.whenGET(productUrl).respond(products);
        //$httpBackend.whenGET(productUrl + "/1").respond(products);
        //$httpBackend.whenGET(productUrl + "/2").respond(products);
        // alternative to ^:
        // regex for productUrl + anynumber of digits
        var editingRegex = new RegExp(productUrl + "/[0-9][0-9]*", '');
        // this returns 1 product based on the URL
        $httpBackend.whenGET(editingRegex).respond(function (method, url, data) {
            // function to return desired product
            var product = { "productId": 0 };
            var parameters = url.split('/');
            var length = parameters.length;
            // id is in the last array element that where the url is split by '/'
            var id = parameters[length - 1];
            if (id > 0) {
                // loop through the array of products and match with id
                for (var i = 0; i < products.length; i++) {
                    if (products[i].productId == id) {
                        product = products[i];
                        break;
                    }
                };
            }
            // if found return 200 for success and the product
            return [200, product, {}];
        });



        // POST data
        // save feature
        $httpBackend.whenPOST(productUrl).respond(function (method, url, data) {
            var product = angular.fromJson(data);
            if (!product.productId) {
                // New product id
                product.productId = products[products.length - 1].productId + 1;
                products.push(product);
            }
            else {
                // updated product
                for (var i = 0; i < products.length; i++) {
                    if (products[i].productId == product.productId) {
                        products[i] = product;
                        break;
                    }
                }
            }
            return [200, product, {}];
        });

        //Pass though any request for application files
        $httpBackend.whenGET(/app/).passThrough();


    })
}());