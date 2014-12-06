'use strict'

grownoutApp.factory('dataService', function ($http, $q) {

    var dataSvc = {};
    dataSvc.getContacts = function (q, pageNumber, totalCountPerPage) {
        q = q || '';
        var deferred = $q.defer();
        $http.get(
            '/api/v1/allcontacts?q=' + q + '&pageNumber=' + pageNumber + '&totalCountPerPage=' + totalCountPerPage 
        ).success(function (data) {
            deferred.resolve(data);
        }).error(function (data) {
            deferred.resolve(data);
        });
        
        return deferred.promise;
    };
    return dataSvc;
})