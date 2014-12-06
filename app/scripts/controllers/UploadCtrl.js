function UploadController($scope, $location, authService, uploadService, $modal){
	if (!authService.isLoggedIn()) {
        $location.path('/');
    }

    $scope.upload = function($files){
    	var file = $files[0];
    	 uploadService.uploadFile($files[0]).then(function(data) {
                if(data.status === 'success') {
                    var data = {};
			    	var modalInstance = $modal.open({
			            templateUrl : './templates/select_fields_modal.html',
			            controller  : 'modalController',
			            backdrop    : 'static',
			            keyboard    : true,
			            scope: $scope,
			            resolve: {
			              data: function(){
			                return data;
			              }
			            }
			        });
                }
                else {
                    console.log("error");
                }
            });
    }    
}

function modalController($scope, $modalInstance, uploadService, $location){
	$scope.cancel = function () {
        $modalInstance.dismiss('cancel');
        $location.path('/upload')
    };

    $scope.saveData = function(name, phone, location) {
    	var headers = ['Email'];
    	if(name === true){
    		headers.push('Name');
    	}
    	if(phone === true){
    		headers.push('Contact');
    	}
    	if(location === true){
    		headers.push('Location');
    	}
        $modalInstance.dismiss('cancel');
    	uploadService.saveData(headers);
    }
}