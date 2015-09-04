var module = angular.module('catalog.controllers', [])
        .controller('CoverCtrl', function ($scope, $state, $ionicHistory, $ionicSlideBoxDelegate, $timeout) {
            $scope.slideHasChanged = function (index) {
                if (index == 2) {
                    $state.go('home');
                    $timeout(function () {
                        $ionicSlideBoxDelegate.slide(0, 0);
                    }, 300);
                }
            }

        })
        .controller('HomeCtrl', function ($scope, $state, $http,$ionicScrollDelegate, $ionicModal, $timeout) {
            //$http.get('http://www.joronoko.com/').then(function (res) {
            $http.get('http://escgroup.net/').then(function (res) {
                $scope.categories = res.data;
            }, function (err) {
                console.error("HOME", err);
            });
            $scope.slideHasChanged = function (index) {
                if (index == 1) {
                    $ionicScrollDelegate.scrollTop();
                }
                if (index == 2) {
                    //Object {title: "Z Hot Rolled Sheet Piles", page: 9, url:
                    // "escgroup.net/esc-hot-rolled-sheet-piles/z-hot-rolled-sheet-piles/", $$hashKey: "object:43"}
                    $state.go('home');
                    //console.log('here');
                }
            }
            $scope.selectCategory = function ($category) {
                //console.log('test',$category);
                $state.go('category', {category: $category});
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
                //console.log($section);
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
                    //console.log('http://' + $scope.section.url);
                    $scope.sectionData = res.data;
                    //console.log('section: ',$scope.section);
                    //console.log('hashkey: ',$scope.section.$$hashKey);
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
                        // Incase value is a TrustedValueHolderType, sometimes it
                        // needs to be explicitly called into a string in order to
                        // get the HTML string.
                        element.html(value && value.toString());
                        // If scope is provided use it, otherwise use parent scope
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