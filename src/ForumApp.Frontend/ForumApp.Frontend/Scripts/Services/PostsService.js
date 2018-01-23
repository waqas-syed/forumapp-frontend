var app = angular.module('app');

app.factory('postsService', ['$http', '$q', 'globalService', function ($http, $q, globalService) {
    return {
        getAllPosts: function () {
            return $http.get(globalService.serverUrl + 'post')
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
        submitNewPost: function(post) {
            return $http.post(globalService.serverUrl + 'post', post)
                .success(function (response) {
                    return response;
                })
                .error(function (error) {
                    return error;
                });
        },
        updatePost: function (post) {
            return $http.put(globalService.serverUrl + 'post', post)
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
        },
        addNewComment: function (comment) {
            return $http.post(globalService.serverUrl + 'post/' + comment.PostId + "/comment", comment)
                .success(function (response) {
                    return response;
                })
                .error(function (error) {
                    return error;
                });
        }
    };
}]);