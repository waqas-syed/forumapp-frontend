(function () {
    'use strict';

    var rentApp = angular.module('app', ['ui.router', 'LocalStorageModule', 'ngAnimate',
        'ngSanitize', 'ui.bootstrap', 'ngTable']);

    rentApp.config(["$stateProvider", "$urlRouterProvider", "$httpProvider", "$locationProvider",
            function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
                //$locationProvider.html5Mode(true);
                $httpProvider.interceptors.push('authInterceptorService');

                $httpProvider.interceptors.push(function () {
                    return {
                        "request": function (config) {
                            if (config.url && config.url.endsWith(".html")) {
                                config.headers["Content-Type"] = "text/html; charset=utf=8";
                                config.headers["Accept"] = "text/html; charset=utf=8";
                            }
                            return config;
                        }
                    };
                });

                $httpProvider.defaults.useXDomain = true;
                $httpProvider.defaults.withCredentials = true;
                delete $httpProvider.defaults.headers.common["X-Requested-With"];
                $httpProvider.defaults.headers.common["Accept"] = "application/json";
                $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
                $httpProvider.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
                $urlRouterProvider.otherwise("/");

                $stateProvider
                    .state("login",
                        {
                            url: "/",
                            controller: "loginController",
                            templateUrl: "/views/login.html",
                            permissions: { hideFromLoggedInUser: true }
                        })
                    .state("signup",
                        {
                            url: "/signup",
                            controller: "signupController",
                            templateUrl: "/views/signup.html",
                            permissions: { hideFromLoggedInUser: true}
                    })
                    .state("posts",
                        {
                            url: "/posts",
                            controller: "postsController",
                            templateUrl: "/views/posts.html",
                            permissions: { redirectForNonLoggedInUser: true }
                    })
                    .state("view-post",
                        {
                            url: "/view-post?id",
                            controller: "postsController",
                            templateUrl: "/views/view-post.html",
                            permissions: { redirectForNonLoggedInUser: true }
                        })
                    .state("add-post",
                        {
                            url: "/add-post",
                            controller: "postsController",
                            templateUrl: "/views/add-post.html",
                            permissions: { redirectForNonLoggedInUser: true }
                    })
                    .state("edit-post",
                        {
                            url: "/edit-post?id",
                            controller: "singlePostController",
                            templateUrl: "/views/edit-post.html",
                            permissions: { redirectForNonLoggedInUser: true }
                        });
            }
        ]
    );

    rentApp.run(["$rootScope", "authService", "$state", "$anchorScroll", function ($rootScope, authService, $state, $anchorScroll) {

        authService.fillAuthData();
        $rootScope.$on('$stateChangeSuccess',
            function(event, next) {
                $anchorScroll();
            });
        $rootScope.$on('$stateChangeStart',
            function(event, next) {
                if (next.permissions !== null && next.permissions !== undefined) {
                    if (authService.authentication.isAuth) {
                        var hideFromLoggedInUser = next.permissions.hideFromLoggedInUser;
                        if (hideFromLoggedInUser !== undefined && hideFromLoggedInUser != null && hideFromLoggedInUser) {
                            event.preventDefault();
                            $state.go('posts');
                        }
                    }
                    if (!authService.authentication.isAuth) {
                        var redirectForNonLoggedInUser = next.permissions.redirectForNonLoggedInUser;
                        if (redirectForNonLoggedInUser) {
                            event.preventDefault();
                            $state.go('login');
                        }
                    }
                }
            });
        $rootScope.$on('$stateChangeError',
            function(event, toState, toParams, fromState, fromParams, error) {
            });

        $rootScope.$on('$stateNotFound',
            function(event, unfoundState, fromState, fromParams) {
            });

        $rootScope.$on('unauthorized', function () {
            authService.logOut();
            $state.go('login');
        });

    }]);
})();