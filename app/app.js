// immediatly invoked function expression
// syntax (function () { }());
// http://blogs.msmvps.com/deborahk/javascript-function-terminology/

(function () {
    "use strict";
    // The main module      (name, dependencies Array)
    var app = angular.module("productManagement",
                            [
                                "common.services",
                                "ui.router", // framework used for routing in single page apps with MVC
                                "productResourceMock", // dependancy for mock data. This can be removed once a real web service is in place. 
                            ]);

    app.config(["$stateProvider",
                "$urlRouterProvider",
                function ($stateProvider, $urlRouterProvider) {

                    // default state if no state is active
                    $urlRouterProvider.otherwise("/products");

                    $stateProvider
                    //Products
                    .state("productList"  , {  // state productlist
                        url: "/products", // sets url
                        templateUrl: "app/products/productListView.html", // path for template
                        controller: "ProductListCtrl  as vm" // controller used
                    })
                }]

    );

}());