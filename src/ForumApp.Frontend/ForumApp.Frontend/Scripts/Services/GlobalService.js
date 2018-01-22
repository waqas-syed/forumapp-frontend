var rentApp = angular.module('app');

rentApp.factory('globalService', function () {
    var defaultServerUrl = 'http://localhost:60810/';
    return {
        serverUrl: defaultServerUrl + 'v1/',
        serverUrlWithoutVersion: defaultServerUrl
    };
});