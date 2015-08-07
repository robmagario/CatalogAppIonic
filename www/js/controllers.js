angular.module('catalog.controllers', [])
    .controller('HomeCtrl', function ($scope, $state, $http, $ionicModal, $timeout) {
        $http.get('http://escgroup.net/').then(function (res) {
            $scope.categories = res.data;
        }, function (err) {
            console.error("HOME", err);
        });

        $scope.selectCategory = function ($category) {
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
        $scope.sections = $scope.category.sections;

        $scope.selectSection = function ($section) {
            $state.go('section', {section: $section});
        }
    })

    .controller('SectionCtrl', function ($scope, $ionicHistory, $sce, $state, $stateParams, $http, $ionicModal, $timeout) {
        if ($stateParams.section == null) {
            $state.go('home');
            $ionicHistory.clearHistory();
            $ionicHistory.clearCache();
        }
        $scope.section = $stateParams.section;

        $http.get('http://' + $scope.section.url).then(function (res) {
            $scope.sectionData = res.data;
        }, function (err) {
            console.error("HOME", err);
        });

        $scope.trustContent = function (html) {
            return $sce.trustAsHtml(html);
        };
    })

;