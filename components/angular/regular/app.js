///////////////////////////////////////////////// configure routs ////////////////////////////////////////////////////////////
WpApp.config(['$routeProvider','$locationProvider','$httpProvider', function($routeProvider, $locationProvider, $httpProvider){
    $routeProvider
    .when('/', {
        templateUrl:'builds/development/part/page.html',
        controller:'routCtrl'
    })
   .when('/:page', {
        templateUrl:'builds/development/part/page.html',
        controller:'routCtrl'
    })  
      .when('/:page/:post', {
        templateUrl:'builds/development/part/page.html',
        controller:'routCtrl'
    })
    .otherwise({
         redirectTo:'/'
       });
     $locationProvider.html5Mode(true).hashPrefix('!');
}]);
///////////// controller that puts out content onto scope as a single HTML string assabled in services and functions ////////////
////////////on separate files, i chose this method over ng-repeat because it's much faster /////////////////////////////////////
WpApp.controller('routCtrl', function($scope, $rootScope, $location, menuData, contentData){
    // get html string from a service and put it ona the scope
    menuData.getMenuItems().then(function(data){
        $rootScope.menuHTML=data;
    });
    contentData.getContent().then(function(data){
        $scope.contentHTML=data;
     });
            // menu animation class distribution
            if($location.path()==='/'){
                $rootScope.homeclass=true;
             }
             else{
                 $rootScope.homeclass=false;
             } 
});
