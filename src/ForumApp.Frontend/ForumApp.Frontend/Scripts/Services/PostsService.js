var app = angular.module('app');

app.factory('postsService', ['$http', '$q', 'globalService', function ($http, $q, globalService) {
    return {
        getPostsByEmail: function (searchParameters) {
            return $http.get(globalService.serverUrl + 'post', { params: searchParameters })
                .success(function (response) {
                    return response;
                })
                .error(function (error) {
                    return error;
                });
        },
        getPost: function (searchParameters) {
            return $http.get(globalService.serverUrl + 'post', { params: searchParameters })
                .success(function (response) {
                    return response;
                })
                .error(function (error) {
                    return error;
                });
        },
        submitNewPost: function(todo) {
            return $http.post(globalService.serverUrl + 'post', todo)
                .success(function (response) {
                    return response;
                })
                .error(function (error) {
                    return error;
                });
        },
        updatePost: function (todo) {
            return $http.put(globalService.serverUrl + 'post', todo)
                .success(function (response) {
                    return response;
                })
                .error(function (error) {
                    return error;
                });
        },
        deletePost: function (id) {
            return $http.delete(globalService.serverUrl + 'post/' + id)
                .success(function (response) {
                    return response;
                })
                .error(function (error) {
                    return error;
                });
        }
    };
}]);