'use strict';

var app = angular.module('app');

app.controller('postsController', [
    '$scope', '$state', 'postsService', 'NgTableParams', '$filter', 'authService',
    function ($scope, $state, postsService, NgTableParams, $filter, authService) {
    
        authService.fillAuthData();
        if (authService.authentication.isAuth) {
            $scope.email = authService.authentication.email;
        }

        $scope.submitNewPost = function () {
            var post = {
                Title: $scope.title,
                Description: $scope.description,
                Category: $scope.category
            };
            postsService.submitNewPost(post).success(function(response) {
                $state.go('posts');
            }).error(function(error) {
                $scope.errorMessage = "Error while submitting new Post. Please try again later";
            });
        }
        
        $scope.addNewPost = function() {
            $state.go('add-post', {email : $scope.email});
        };
    }
]);