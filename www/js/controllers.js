var oneSection=[];
angular.module('catalog.controllers', [])
    .controller('HomeCtrl', function ($scope, $http, $ionicModal, $timeout) {
        $http.get('http://escgroup.net/').then(function (res) {
            console.log(' \n\n\n\n\n\nrestarted')
            $scope.categories = res.data;
            $scope.subCateView= -1;
            $scope.numtwo= 2;
            $scope.oneSection=[];
            var i,j=0;
            $scope.filterIt=function(){
                var _it=$scope.categories;
                $scope.oneSection=[];
                for(i=0;i<_it.length;i++){
                    if(i==$scope.subCateView){
                        //console.log(i,"\n",$scope.subCateView);
                        //console.log(_it,'\n','index: ',i);
                        var _section=_it[i].sections;
                        for(j=0;j<_section.length;j++){
                            //console.log(_section[j].title);
                            $scope.oneSection.push( _section[j]);
                        }
                    }
                }
                oneSection=$scope.oneSection;

            };
            $scope.objectKeys=function(_it,_index){
                if(_index<2){
                    return false;
                }
                return false;
            };
            $scope.setCateView= function (index){
                $scope.inSubCate=!$scope.inSubCate;
                $scope.subCateView=index;
                //$scope.newInfo="http://escgroup.net/site/assets/files/1019/p_10_1.0x100.jpg?nc=1438425728";
            }
        }, function (err) {
            console.error("HOME", err);
        });

})

    .controller('CategoryCtrl', function ($scope, $http, $ionicModal, $timeout) {
        var _url="http://escgroup.net/esc-hot-rolled-sheet-piles/z-hot-rolled-sheet-piles/";
        $http.get(_url).then(function (res) {
        //$http.get('http://escgroup.net/').then(function (res) {
            $scope.myData= res.data;
            $scope.myHtml= $scope.myData.content;
            $scope.numtwo= 2;
            var i,j=0;
            $scope.oneSection=oneSection;

            ('ng-bind-html', function() {
                expect(element(by.binding('myHTML')).getText()).toBe(
                    $scope.myHtml);
            });
             console.log('scope','\n',$scope.myHtml);
        }, function (err) {
            console.error("HOME", err);
        });
})

;