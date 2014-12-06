'use strict';
grownoutApp.factory('authService', function ($rootScope, $cookieStore, $log) {
    var authSvc = {},
        _authStatus = {
            logged_in: false,
            errors: false,
            messages: null,
            remember_me: false
        }

    if ($cookieStore.get('logged_in') === true) {
        _authStatus.logged_in = true;
    }
    authSvc.setAuthStatus = function (logged_in) {
        _authStatus = {
            logged_in: logged_in
        };
        authSvc.broadcastChange();
    };
    authSvc.getAuthStatus = function () {
        return _authStatus;
    };
    authSvc.isLoggedIn = function () {
        return $cookieStore.get('logged_in');
    };
    authSvc.login = function ($scope, $http, $location) {
        $http.post('/api/v1/auth/login', {username: $scope.user.name, password: $scope.user.pass})
            .success(function (data) {
                if(data) {
                    _authStatus.logged_in = true;
                    $cookieStore.put('logged_in', true);
                    $location.path('/upload');
                }
                else {
                    $scope.auth.errors = 'You are not authorized.'
                }
                authSvc.broadcastChange();
            }).error(function (data) {
                authSvc.setAuthStatus(false);
                $scope.auth.errors = 'Incorrect username or password.';
            });
    };
    authSvc.logout = function ($scope, $http, $location) {
        $cookieStore.remove('logged_in');
        authSvc.setAuthStatus(false);
        $http.get('/api/v1/auth/logout')
            .success(function () {
                _authStatus = {};
                authSvc.broadcastChange();
                $location.path('/');
            })
            .error(function (data, status, header, config) {

            });
    };
    authSvc.register = function ($scope, $http, $location) {
        var request = $http.post('/api/v1/auth/register', {
            username: $scope.username, 
            password: $scope.password,
            email: $scope.email
        });
        return request.then(function (response) {
            if (response.data.status === "success") {
                _authStatus.logged_in = true;
                $cookieStore.put('logged_in', true);
                $location.path('/upload');
            } else {
                authSvc.setAuthStatus(false, true, response.data, null);
            }
        }, function (response) {
            $scope.auth.errors = response.data.info.message;
            authSvc.setAuthStatus(false, true, response.data, null);
        });
    };
    authSvc.broadcastChange = function () {
        $rootScope.$broadcast('handleChangedAuthStatus');
    };
    return authSvc;
});