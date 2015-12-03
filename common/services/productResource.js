(function () {
    "use strict";
    
    angular
        .module("common.services")
        .factory("productResource",
                // min safe array
                ["$resource", productResource]);


    function productResource($resource) {
        // angular resource ($resource) object used to retrieve the data
        // via a restful url
        // this url is intercepted by productResourceMock 
        return $resource("/api/products/:productId")
    }

}());