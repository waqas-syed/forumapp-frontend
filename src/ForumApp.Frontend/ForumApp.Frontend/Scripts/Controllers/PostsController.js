﻿'use strict';

var app = angular.module('app');

app.controller('postsController', [
    '$scope', '$state', 'postsService', 'NgTableParams', '$filter', 'authService',
    function ($scope, $state, postsService, NgTableParams, $filter, authService) {
    
        authService.fillAuthData();
        if (authService.authentication.isAuth) {
            $scope.email = authService.authentication.email;
        }
        
        postsService.getAllPosts().success(function(response) {
            $scope.posts = response;
        }).error(function(error) {
            $scope.errorMessage = "Error while retreiving Posts. Please try again later.";
        });

        $scope.submitNewPost = function () {
            var post = {
                Title: $scope.title,
                Description: $scope.description,
                Category: $scope.category,
                Email: $scope.email
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

        $scope.getSinglePost = function(id) {
            $state.go('edit-post', { id: id });
        }

        $scope.deletePost = function(id) {
            postsService.deletePost(id).
                success(function() {
                    $state.go($state.current, null, { reload: true });
                }).error(function(error) {
                    $scope.errorMessage = "Error while deleting the said post.";
                });

        }
    }
]);