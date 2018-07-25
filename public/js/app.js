var menuApp = angular.module('menuApp', [
  'ngRoute',
  'userControllers',
  'userServices',
  "restangular"
]);
menuApp.config(['$routeProvider', function($routeProvider) {
    
    $routeProvider.
    when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginController'
    }).
    when('/signup', {
        templateUrl: 'partials/signup.html',
        controller: 'SignupController'
    }).
    when('/front', {
        templateUrl: 'partials/front.html',
        controller: 'FrontController'
    }).
    when('/', {
        templateUrl: 'partials/index.html',
        controller: 'MainController'
    }).
    otherwise({
        redirectTo: '/'
    });

}]);