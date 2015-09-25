var module = angular.module('catalog.controllers', [])
        .controller('HomeCtrl', function ($scope, $state, $http, $ionicHistory, $ionicScrollDelegate, $ionicSlideBoxDelegate, $timeout,$ionicNavBarDelegate) {
            $http.get('http://escgroup.net/').then(function (res) {
                $ionicScrollDelegate.getScrollView().options.scrollingY = false;
                console.log('awoke');
                $scope.categories = res.data;
                //skip for test
                //$ionicSlideBoxDelegate.slide(4);
                //var _firstSection =
                //{url: "escgroup.net/esc-hot-rolled-sheet-piles/z-hot-rolled-sheet-piles/"};
                //$state.go('section', {section: _firstSection});
                //var _firstSection =
                //{url: "escgroup.net/piling-accessories/test/"};
                //$state.go('section', {section: _firstSection});

            }, function (err) {
                console.error("HOME", err);
            });
            $scope.selectCategory = function ($category) {
                if(!$category){
                    return
                }
                //fixed the back button
                $ionicHistory.clearHistory();
                $ionicHistory.clearCache();
                $state.go('category', {category: $category});
            };
            $scope.slideHasChanged = function (index) {
                $timeout(function () {
                    //ugly code
                    var usesPileIndex = 2;
                    var aboutESCIndex = 3;
                    var contentIndex = 4;
                    if(index==3){
                        $('#video1,#video2,#video3,#video4').show();
                    }
                    if (index == aboutESCIndex) {
                        $ionicScrollDelegate.getScrollView().options.scrollingY = true;
                    } else {
                        $ionicScrollDelegate.scrollTop();
                        $timeout(function () {
                            $ionicScrollDelegate.getScrollView().options.scrollingY = false;
                        }, 200);
                    }
                    if (index == 5) {
                        var _firstSection =
                        {url: "escgroup.net/esc-hot-rolled-sheet-piles/z-hot-rolled-sheet-piles/"};
                        $state.go('section', {section: _firstSection});
                    }
                },100);
            }
        })

        .controller('CategoryCtrl', function ($scope, $state, $ionicHistory, $stateParams, $http, $ionicModal, $timeout) {
            if ($stateParams.category == null) {
                $state.go('home');
                $ionicHistory.clearHistory();
                $ionicHistory.clearCache();
            }
            $scope.category = $stateParams.category;
            if ($scope.category != null)
                $scope.sections = $scope.category.sections;

            $scope.selectSection = function ($section) {
                console.log($section);
                if(!$section){
                    return
                }
                $state.go('section', {section: $section});
            };
        })

        .controller('SectionCtrl', function ($scope,$ionicLoading,$ionicSlideBoxDelegate,$ionicScrollDelegate, $ionicHistory, $compile, $sce, $state, $stateParams, $http, $ionicModal, $timeout) {
            if ($stateParams.section == null) {
                $state.go('home');
                $ionicHistory.clearHistory();
                $ionicHistory.clearCache();
            }

            $scope.slideHasChanged = function (index) {
                if(index==1){
                    $ionicScrollDelegate.scrollTop();
                    $ionicSlideBoxDelegate.enableSlide(false);
                }else{
                    $ionicSlideBoxDelegate.enableSlide(true);
                }
                $scope.slideTh=index;
            };
            $scope.section = $stateParams.section;
            if ($scope.section != null) {
                $http.get('http://' + $scope.section.url).then(function (res) {
                    $scope.sectionData = res.data;
                    $scope.theTable=$scope.sectionData.tables[0];
                }, function (err) {
                    console.error("HOME", err);
                });
            }
            $scope.slideTo=function(index){
                $ionicSlideBoxDelegate.slide(index);
            };
            $scope.debugIt=function(){

            };
            $scope.isDetail=false;
            var $table=$('#thetable table');
            $scope.showDetail=function($event) {
                $ionicScrollDelegate.scrollTop();
                if( /iPad/i.test(navigator.userAgent) ) {
                    //table with sticky header for iPad

                }
                if($(window).width()<=768){
                    //phone size
                    //clicking on a table then shows information in a list
                }
                $scope.isDetail=!$scope.isDetail;
                if(!$scope.isDetail){
                    $scope.targetTitle='';
                }
                if(!$event){
                    return;
                }
                var _rootTitle=$('#thetable').find('tr:eq(0)').find('td:eq(0)').text();
                _rootTitle=String(_rootTitle).trim();
                var _trTarget=$event.target.parentNode;
                var _trIndex=$('#thetable table tr').index(_trTarget);
                _trIndex--;
                if(_trIndex<0){
                    $scope.isDetail=false;
                    return;
                }
                var _json=$('#thetable table').tableToJSON();
                $.each(_json[_trIndex], function(index, value) {
                    if(index==_rootTitle){
                        $scope.targetTitle=value+'<br>';
                        delete _json[_trIndex][String(_rootTitle)];
                    }
                });
                $scope.tableContents=_json[_trIndex];
            };

            $scope.trustContent = function (html) {
                return $sce.trustAsHtml(html);
            };
        })

        .directive('bindHtmlCompile', ['$compile', function ($compile) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    scope.$watch(function () {
                        return scope.$eval(attrs.bindHtmlCompile);
                    }, function (value) {
                        element.html(value && value.toString());
                        var compileScope = scope;
                        if (attrs.bindHtmlScope) {
                            compileScope = scope.$eval(attrs.bindHtmlScope);
                        }
                        $compile(element.contents())(compileScope);
                    });
                }
            };
        }])

    ;