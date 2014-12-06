function DataController($scope, $http, $modal, $location, authService, dataService) {
	if (!authService.isLoggedIn()) {
        $location.path('/');
    }

    function init () {
        $scope.currentPage = 1;
        $scope.totalCountPerPage = 10;
        $scope.totalContacts = 10;
        $scope.maxSize = 10;
        $scope.contacts = [];
    }

    init();

    $scope.$watch('currentPage', function() {
        $scope.getContacts();
    });

    $scope.$watch('searchTerm', function() {
        init();
        $scope.getContacts();
    });

    $scope.getContacts = function () {
    	dataService.getContacts(
            $scope.searchTerm,
            $scope.currentPage,
            $scope.totalCountPerPage).then(function (data) {
            $scope.contacts = data.info.CONTACTS || [];
            $scope.totalContacts = data.info.totalCount;
        })
    }
}