'use strict';

var app = angular.module('app');

app.controller('singlePostController', [
    '$scope', '$state', '$stateParams', 'postsService', 'authService',
    function ($scope, $state, $stateParams, postsService, authService) {

        authService.fillAuthData();
        if (authService.authentication.isAuth) {
            $scope.email = authService.authentication.email;
        };

        postsService.getPost({ postId : $stateParams.id }).success(function(response) {
            $scope.post = response;
        }).error(function(error) {
            $scope.errorMessage = "Error while retreving the post. Please try again later";
            });

        
    }
]);