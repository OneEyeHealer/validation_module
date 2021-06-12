angular.module("myApp").component("navbar", {
  templateUrl: "navbar/navbar.html",
  controller:
    ("$scope",
    function NavBarController($scope) {
      $scope.Title = "Task Maker";
    }),
});
