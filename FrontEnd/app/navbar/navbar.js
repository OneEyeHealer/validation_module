angular.module("myApp").component("navbar", {
  // This name is what AngularJS uses to match to the `<phone-list>` element.
  templateUrl: "navbar/navbar.html",
  controller:
    ("$scope",
    function NavBarController($scope) {
      $scope.Title = "Task Maker";
    }),
});

// var myApp = angular.module('myApp', []);
