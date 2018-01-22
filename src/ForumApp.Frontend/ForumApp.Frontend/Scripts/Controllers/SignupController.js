'use strict';

var rentApp = angular.module('app');
rentApp.controller('signupController', ['$scope', '$location', '$timeout', 'authService', '$state',
    function ($scope, $location, $timeout, authService, $state) {
 
        $scope.savedSuccessfully = false;
        $scope.message = "";
 
        $scope.registration = {
            password: "",
            confirmPassword: ""
        };
 
        $scope.signUp = function () {

            if ($scope.registration.password !== $scope.registration.confirmPassword) {
                $scope.passwordsDontMatch = true;
            } else {
                $scope.passwordsDontMatch = false;
                authService.saveRegistration($scope.registration)
                    .then(function(response) {
                            startTimer();
                        },
                        function (response) {
                            var errors = [];
                            for (var key in response.data.modelState) {
                                for (var i = 0; i < response.data.modelState[key].length; i++) {
                                    errors.push(response.data.modelState[key][i]);
                                }
                            }
                            $scope.message = "Failed to register user due to:" + errors.join(' ');
                        });
            }
        };
 
        var startTimer = function () {
            var timer = $timeout(function () {
                $timeout.cancel(timer);
                //$location.path('/login');
                $state.go('login');
            }, 2000);
        }
 
    }]);