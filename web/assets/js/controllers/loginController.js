(function(){

    var logIn = angular.module('chanchito.logInController', []);

    logIn.controller('loginController', [ 
    '$scope', '$http', '$location', '$window', 'UserService', 'AuthenticationService',
    function ($scope, $http, $location, $window, UserService, AuthenticationService) {
        $scope.logIn = function (username, password) {
            if (username !== undefined && password !== undefined) {
                UserService.logIn(username, password).success(function(data) {
                    AuthenticationService.isAuthenticated  = true;
                    $window.sessionStorage.isAuthenticated = true;
                    $window.sessionStorage.token           = data.token;
                    $location.path('/home');
                    console.log('entre');
                }).error(function(status, data) {
                    $scope.error = true;
                    console.log('error');
                });
            }
        };

       $scope.logOut = function (){
            if (AuthenticationService.isAuthenticated) {
                AuthenticationService.isAuthenticated = false;
                delete $window.sessionStorage.isAuthenticated;
                delete $window.sessionStorage.token;
                $location.path('/');
            }
        };
    }]);

})();