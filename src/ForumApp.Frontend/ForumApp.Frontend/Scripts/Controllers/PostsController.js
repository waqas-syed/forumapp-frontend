'use strict';

var app = angular.module('app');

app.controller('postsController', [
    '$scope', '$state', '$stateParams', 'postsService', 'NgTableParams', '$filter', 'authService', 'categoriesService',
    function ($scope, $state, $stateParams, postsService, NgTableParams, $filter, authService, categoriesService) {

        $scope.currentPost = {};
        $scope.newPost = true;
        authService.fillAuthData();
        if (authService.authentication.isAuth) {
            $scope.email = authService.authentication.email;
        }

        categoriesService.getAllCategories().success(function (response) {
            $scope.categories = response;
        }).error(function (error) {
            $scope.errorMessage = "Error while retreiving Categories. Please try again later.";
            });

        function truncateText(selector, maxLength) {
            var element = document.querySelector(selector),
                truncated = element.innerText;

            if (truncated.length > maxLength) {
                truncated = truncated.substr(0, maxLength) + '...';
            }
            return truncated;
        }

        postsService.getAllPosts().success(function(response) {
            $scope.posts = response;
            document.querySelector('p').innerText = truncateText('p', 107);
        }).error(function(error) {
            $scope.errorMessage = "Error while retreiving Posts. Please try again later.";
            });

        if ($stateParams.id !== null && $stateParams.id !== undefined && $stateParams.id !== "") {
            $scope.newPost = false;
            postsService.getPost({ postId: $stateParams.id }).success(function (response) {
                $scope.currentPost = response;
            }).error(function (error) {
                $scope.errorMessage = "Error while retreving the post. Please try again later";
            });
        }

        $scope.addNewComment = function() {
            var comment = {
                AuthorEmail: $scope.email,
                Text: $scope.commentText,
                PostId: $scope.currentPost.Id
            };
            postsService.addNewComment(comment)
                .success(function(response) {
                    $state.go($state.current, { id: $scope.currentPost.Id }, { reload: true });
                }).error(function(error) {
                    $scope.errorMessage = "Error while posting the comment";
                });
        }

        $scope.submitNewPost = function () {
            if ($scope.newPost) {
                var post = {
                    Title: $scope.currentPost.Title,
                    Description: $scope.currentPost.Description,
                    Category: $scope.currentPost.Category,
                    Email: $scope.email
                };
                postsService.submitNewPost(post).success(function(response) {
                    $state.go('posts');
                }).error(function(error) {
                    $scope.errorMessage = "Error while submitting new Post. Please try again later";
                });
            } else {
                var updatedPost = {
                    Id: $scope.currentPost.Id,
                    Title: $scope.currentPost.Title,
                    Description: $scope.currentPost.Description,
                    Category: $scope.currentPost.Category,
                    Email: $scope.email
                };
                postsService.updatePost(updatedPost).success(function (response) {
                    $state.go('posts');
                }).error(function (error) {
                    $scope.errorMessage = "Error while submitting new Post. Please try again later";
                });
            }
        };
        
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