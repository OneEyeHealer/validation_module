var app = angular.module("myApp", []);
app.run(function ($rootScope) {
    $rootScope.exercise = {};
    $rootScope.AddModule = "+ Create Module"
})
app.controller("moduleController", function ($scope, $rootScope, $http) {
    $scope.currentTime = new Date().toLocaleTimeString();
   
    $http.get("/api/Segment").then(function (d) {
        $rootScope.OnAddModule = () => {
            $scope.data=d.data
            console.log(d.data);
        }
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

    $scope.openTask = (data) => {
        console.log(data);
        $rootScope.task = data.Tasks
    }

    
})