const baseUrl = require('../config').baseUrl;
module.exports = function($scope, $http, $rootScope, $window) {
    $scope.validUsername = false;
    $scope.username = '';
    $scope.userid = '';
    $scope.checkUsername = () => {
        $http.post(`${baseUrl}users`, { uid: $scope.username }).then(res => {
            console.log(res.data);
            if(res.data) {
                console.log('It exists');
                $scope.validUsername = false;
            } else {
                console.log('It doesnt');
                $scope.validUsername = true;
            }
        });
    }
    $scope.startSession = () => {
        $http.post(`${baseUrl}user`, { uid: $scope.username }).then(res => {
            $rootScope.userid = res.data;
            $window.location.href = `/index.html#!/home/${$rootScope.userid}`;
        });
    }
    $scope.signIn = () => {
        if ($scope.userid) {
            $http.get(`${baseUrl}uid/${$scope.userid}`).then(res => {
                if (res.data) {
                    $rootScope.userid = res.data.id;
                    $window.location.href = `/index.html#!/home/${$rootScope.userid}`;
                }
            });
        }
    }
}