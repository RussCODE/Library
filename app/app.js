'use strict';

angular.module('libraryApp', [
  'ngRoute'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider)
{
  $locationProvider.hashPrefix('!');
    $routeProvider
        .when("/",
        {
            templateUrl : "home/home.html"
        })
        .when("/addBook",
        {
            templateUrl: "addBook/addBook.html"
        })
        .when("/updateBook",
        {
            templateUrl: "updateBook/updateBook.html"
        });
}]).controller('libraryCtrl', ['$scope', function($scope)
{

}]);
