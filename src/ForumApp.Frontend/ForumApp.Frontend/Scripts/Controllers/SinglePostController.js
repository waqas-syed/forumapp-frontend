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

        $scope.updatePost = function () {
            var post = {
                Id: $scope.post.Id,
                Title: $scope.post.Title,
                Description: $scope.post.Description,
                Category: $scope.post.Category,
                Email: $scope.email
            };
            postsService.updatePost(post).success(function (response) {
                $state.go('posts');
            }).error(function (error) {
                $scope.errorMessage = "Error while submitting new Post. Please try again later";
            });
        }
    }
]);