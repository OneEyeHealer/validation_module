var app = angular.module("myApp",[]);
app.controller("myController", function ($scope, $http) {
   
    $http.get("/api/Segment").then(function (d) {
        $scope.data=d.data
        console.log(d);
    }, function (error) {
            alert(d)
    })
    

      
})