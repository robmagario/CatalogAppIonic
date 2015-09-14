var module = angular.module('catalog.controllers', [])
        .controller('HomeCtrl', function ($scope, $state, $http, $ionicHistory, $ionicScrollDelegate, $ionicSlideBoxDelegate, $timeout,$ionicNavBarDelegate) {
            $http.get('http://escgroup.net/').then(function (res) {
                $ionicScrollDelegate.getScrollView().options.scrollingY = false;
                //$scope.stayHere();
                console.log('awoke');
                $scope.categories = res.data;
                //skip for test
                $ionicSlideBoxDelegate.slide(4);
            }, function (err) {
                console.error("HOME", err);
            });
            $scope.selectCategory = function ($category) {
                $state.go('category', {category: $category});
            };
            $scope.slideHasChanged = function (index) {
                $timeout(function () {
                    //ugly code
                    var usesPileIndex = 2;
                    var aboutESCIndex = 3;
                    var contentIndex = 4;
                    if (index == aboutESCIndex) {
                        $ionicScrollDelegate.getScrollView().options.scrollingY = true;
                    } else {
                        $ionicScrollDelegate.scrollTop();
                        $timeout(function () {
                            $ionicScrollDelegate.getScrollView().options.scrollingY = false;
                        }, 100);
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
                $state.go('section', {section: $section});
            }
        })

        .controller('SectionCtrl', function ($scope, $ionicHistory, $compile, $sce, $state, $stateParams, $http, $ionicModal, $timeout) {
            if ($stateParams.section == null) {
                $state.go('home');
                $ionicHistory.clearHistory();
                $ionicHistory.clearCache();
            }
            $scope.section = $stateParams.section;
            if ($scope.section != null) {
                $http.get('http://' + $scope.section.url).then(function (res) {
                    $scope.sectionData = res.data;
                }, function (err) {
                    console.error("HOME", err);
                });
            }

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