function RegisterController($scope, $http, $location, authService){
	
	$scope.auth = {};
	$scope.register = function() {
		authService.register($scope, $http, $location);
	}	
}