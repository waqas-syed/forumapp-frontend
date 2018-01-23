var app = angular.module('app');

app.factory('categoriesService', ['$http', '$q', 'globalService', function ($http, $q, globalService) {
    return {
        getAllCategories: function () {
            return $http.get(globalService.serverUrl + 'category')
                .success(function (response) {
                    return response;
                })
                .error(function (error) {
                    return error;
                });
        }
    };
}]);