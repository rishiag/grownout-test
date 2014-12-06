function AuthController($scope, $http, $location, authService) {
	
	if (!authService.isLoggedIn()) {
        $location.path('/');
    }

	$scope.auth = {};

	$scope.isLoggedIn = function () {
		if(authService.isLoggedIn()) {
			return true;
		}
		return false;
	}

	$scope.login = function() {
		authService.login($scope, $http, $location);
	}

	$scope.logout = function () {
		authService.logout($scope, $http, $location);
	}
}