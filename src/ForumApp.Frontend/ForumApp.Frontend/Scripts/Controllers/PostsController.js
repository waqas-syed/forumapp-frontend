'use strict';

var app = angular.module('app');

app.controller('postsController', [
    '$scope', '$state', 'todoListService', 'NgTableParams', '$filter', 'authService',
    function ($scope, $state, todoListService, NgTableParams, $filter, authService) {
    
        authService.fillAuthData();
        if (authService.authentication.isAuth) {
            $scope.email = authService.authentication.email;
        }
        
        $scope.addNewPost = function() {
            $state.go('add-post', {email : $scope.email});
        };
    }
]);