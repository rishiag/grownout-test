'use strict'

grownoutApp.factory('uploadService', function($http, $q, $upload, $location) {
	var uploadSvc = {};

    uploadSvc.uploadFile = function (file) {

        var deferred = $q.defer();

        $upload.upload({
            url: '/api/v1/upload',
            method: 'POST',
            file: file
        }).success(function (data) {
            deferred.resolve(data);
        }).error(function (data) {
            deferred.reject(data);
        });
        
        return deferred.promise;
    };

    uploadSvc.saveData = function(headers){
    	$http.post('/api/v1/save', headers)
            .success(function (data) {
                if(data) {
                	if (data.status === 'success'){
		    			$location.path('/data');
		    		}
                }
            }).error(function (data) {
            	console.log(data);
            });        
    }
    return uploadSvc;
})