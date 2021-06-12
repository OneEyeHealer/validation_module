angular.module("myApp").component("segment", {
  templateUrl: "segment/segment.html",
  controller:
    ("$scope",
    function NavBarController($scope) {
      $scope.AddSegment = " + Add Segment";
      $scope.TaskCount = 0;
      $scope.Exercises = [];
      $scope.Tasks = [];

      // setment post
      $scope.OnAddSegment = () => {
        console.log("segment added");
      };

      $scope.OnAddExercise = () => {
        $scope.errortext = "";
        if (!$scope.NewExercise) return;
        if ($scope.Exercises.indexOf($scope.NewExercise) === -1) {
          $scope.Exercises.push($scope.NewExercise);
          $scope.GetTaskCount();
          $scope.NewExercise = "";
        } else {
          $scope.errorExerxise = "this segement is allready added to list";
        }
      };

      // count the task
      $scope.GetTaskCount = () => {
        $scope.TaskCount += 1;
      };

      // task post
      $scope.PostTask = () => {
        $scope.errortext = "";
        if (!$scope.NewTask) return;
        if ($scope.Tasks.indexOf($scope.NewTask) === -1) {
          $scope.Tasks.push($scope.NewTask);
          $scope.GetTaskCount();
          $scope.NewTask = "";
        } else {
          $scope.errortext = "this segement is allready added to list";
        }
      };
      // task delete
      $scope.DeleteTask = (task) => {
        $scope.Tasks.splice(task, 1);
      };
    }),
});
