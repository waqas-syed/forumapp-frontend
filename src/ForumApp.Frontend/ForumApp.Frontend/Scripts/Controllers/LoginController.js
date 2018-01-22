'use strict';

var rentApp = angular.module('app');
rentApp.controller('loginController', ['$scope', '$state', 'authService', function ($scope, $state, authService) {
    
    $scope.message = "";
    $scope.login = function () {
        authService.login($scope.loginData).then(function (response) {
                $state.go('posts', {email : $scope.loginData.userName});
            },
            function (err) {
                console.log(err);
            });
    };
}]);