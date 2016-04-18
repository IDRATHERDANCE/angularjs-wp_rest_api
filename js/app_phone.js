
var WpApp = angular.module('WpApp', ['ngRoute', 'ngAnimate', 'ngResource', 'ngSanitize', 'ngLocationUpdate'])


.config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider)
{
    $routeProvider
    .when('/', {
        templateUrl: '/part/home.html',
        controller: 'routCtrl'
    })
    .when('/:page', {
        templateUrl: '/part/page.html',
        controller: 'routCtrl'
    })  
     .when('/:page/:post', {
         templateUrl: '/part/page.html',
        controller: 'routCtrl'
    })  
    .otherwise({
         redirectTo: '/part/home.html'
       });
     $locationProvider.html5Mode(true).hashPrefix('!');
}]);
WpApp.controller('routCtrl', function($scope,$rootScope,$routeParams,$location,menuDataPhone,contentData){
    // get html string from a service and put it ona the scope
    menuDataPhone.getMenuItemsPhone().then(function(data){
      $rootScope.menuPhoneHTML=data;
    });
    contentData.getContent().then(function(data){
        $scope.contentHTML=data;
     });
});






