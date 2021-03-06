(function(){

    var logIn = angular.module('chanchito.logInFactory', []);

    logIn.factory('AuthenticationService', function() {
        var auth = {
            isAuthenticated: false
        }
        return auth;
    });

    logIn.factory('UserService', ['$http', 'chanchitoApi', function ($http, chanchitoApi) {
        return {
            logIn: function(username, password) {
                return $http({
                    method: 'post',
                    url: chanchitoApi.host+'token/', 
                    data: {username: username, password: password}
                });
            }
        }
    }]);

    logIn.factory('TokenInterceptor', ['$q', '$window', '$location', 'AuthenticationService',
    function ($q, $window, $location, AuthenticationService) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                if ($window.sessionStorage.token) {
                    config.headers.Authorization = 'token ' + $window.sessionStorage.token;
                }
                return config;
            },
     
            requestError: function(rejection) {
                return $q.reject(rejection);
            },
     
             // Set Authentication.isAuthenticated to true if 200 received 
            response: function (response) {
                if (response != null && response.status == 200 && $window.sessionStorage.token && !AuthenticationService.isAuthenticated) {
                    AuthenticationService.isAuthenticated = true;
                }
                return response || $q.when(response);
            },
     
             // Revoke client authentication if 401 is received 
            responseError: function(rejection) {
                if (rejection != null && rejection.status === 401 && ($window.sessionStorage.token || AuthenticationService.isAuthenticated)) {
                    delete $window.sessionStorage.token;
                    delete $window.sessionStorage.isAuthenticated;
                    AuthenticationService.isAuthenticated = false;
                    $location.path('/');
                }
     
                return $q.reject(rejection);
            }
        };
    }]);
    
})();

