// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
function shouldRotateToOrientation(degrees) {
    return true;
};

angular.module('catalog', ['ionic', 'catalog.controllers'])

    .run(function ($ionicPlatform) {
        ionic.Platform.isFullScreen = true;
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
            //$ionicScrollDelegate.getScrollView().options.scrollingY = false;

        });
    })
    .config(function ($stateProvider, $httpProvider, $urlRouterProvider,$sceDelegateProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'templates/home.html',
                controller: 'HomeCtrl'
            })
            .state('category', {
                url: '/category/',
                templateUrl: 'templates/category.html',
                controller: 'CategoryCtrl',
                params: {category: null},
                //don't know why,without setting the cache false,clicking one category will result in
                //going to the same section by John
                cache: false
            })
            .state('section', {
                url: '/section/',
                templateUrl: 'templates/section.html',
                controller: 'SectionCtrl',
                params: {section: null}
            })
        ;
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/');
    });
function shouldRotateToOrientation(degrees) {
    return true;
};
