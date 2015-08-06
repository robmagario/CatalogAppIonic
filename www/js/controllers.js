angular.module('catalog.controllers', [])

    .controller('HomeCtrl', function ($scope, $http, $ionicModal, $timeout) {
        $http.get('http://escgroup.net/').then(function (res) {
            console.log(' \n\n\n\n\n\nrestarted')
            $scope.categories = res.data;
            $scope.sections = $scope.categories.sections;
            $scope.inOneCata= false;
            $scope.numtwo= 0;
            $scope.clickTest = function (){
                alert('receive click');
            }
            $scope.showCata= function (index){
                console.log("$scope \n",$scope.categories);
                $scope.inSubCata=!$scope.inSubCata;
                $scope.newInfo="http://escgroup.net/site/assets/files/1019/p_10_1.0x100.jpg?nc=1438425728";
                $scope.newInfo2=$scope.categories[0].sections[2].title;
                console.log('test \n',index);
                //console.log('test \n',$event);
            }
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