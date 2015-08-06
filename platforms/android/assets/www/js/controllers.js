angular.module('catalog.controllers', [])

    .controller('HomeCtrl', function ($scope, $http, $ionicModal, $timeout) {
        $http.get('http://escgroup.net/').then(function (res) {
            $scope.categories = res.data;
        }, function (err) {
            console.error("HOME", err);
        });
})

    .controller('CategoryCtrl', function ($scope, $http, $ionicModal, $timeout) {
        $http.get('http://escgroup.net/').then(function (res) {
            $scope.categories = res.data;
        }, function (err) {
            console.error("HOME", err);
        });
})

;