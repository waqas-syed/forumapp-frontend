'use strict';

var rentApp = angular.module('app');
rentApp.controller('indexController', ['$scope', '$location', 'authService', '$state', function ($scope, $location, authService, $state) {

    $scope.isAuthenticated = function () {
        authService.fillAuthData();
        if (authService.authentication.isAuth) {
            return true;
        } else {
            return false;
        }
    };

    $scope.getCurrentUserEmail = function () {
        if (authService !== null && authService !== undefined &&
            authService.authentication != null && authService.authentication !== undefined &&
            authService.authentication.email != null && authService.authentication.email !== undefined) {
            return authService.authentication.email;
        } else {
            authService.fillAuthData();
            return authService.authentication.email;
        }
    };

    $scope.logOut = function () {
        authService.logOut();
        $state.go('login');
    }

    $scope.authentication = authService.authentication;

}]);