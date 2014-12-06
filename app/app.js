var grownoutApp = angular.module('grownoutApp', ['ngCookies', 'ui.bootstrap', 'ngRoute','angularFileUpload']);

grownoutApp.config(function ($routeProvider) {
	$routeProvider.
	when('/', {
		controller: AuthController,
		templateUrl: '/templates/landing.html'
	}).
	when('/register', {
		controller: RegisterController,
		templateUrl: '/templates/register.html'
	}).
	when('/upload', {
		controller: UploadController,
		templateUrl: '/templates/upload.html'
	}).
	when('/data', {
		controller: DataController,
		templateUrl: '/templates/data.html'
	}).
	otherwise({
		redirectTo: '/error'
	});
});
