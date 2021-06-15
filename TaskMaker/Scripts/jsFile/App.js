var app = angular.module("myApp", []);
app.run(function ($rootScope) {
    $rootScope.exercise = {};
})
app.controller("myController", function ($scope, $rootScope,$http) {
   
    $http.get("/api/Segment").then(function (d) {
        $scope.data=d.data
        console.log(d.data);
    }, function (error) {
            alert(d)
    })
    $scope.openExercise = function (data) {
        console.log(data);
        $rootScope.exercise= data.Exercises
        $scope.exerciseData = data.Exercises
     }

})
app.controller("exerciseController", function ($scope, $rootScope) {

    $scope.openTask = function (data) {
        console.log(data);
        $rootScope.task = data.Tasks
    }

    
})