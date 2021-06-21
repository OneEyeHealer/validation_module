var app = angular.module("myApp", ["dndLists"]);

app.run(($rootScope) => {
  $rootScope.isNumber = [0 - 9] + $;
  // create variable
  $rootScope.CModule = "+ Create Module";
  $rootScope.CExercise = "+ Create Exercise";
  $rootScope.CTask = "+ Create Task";

  // rearrange variable
  $rootScope.RModule = "Rearrange Module";
  $rootScope.RExercise = "Rearrange Exercise";
  $rootScope.RTask = "Rearrange Task";

  $rootScope.RearrangeData = [];
  $rootScope.idRD = null;
  $rootScope.nameRD = null;

  $rootScope.currentTime = new Date().toLocaleTimeString();
});

app.controller("moduleController", ($scope, $rootScope, $http) => {
  //interface
  $scope.form = {
    id: 0,
    name: null,
    description: null,
    category: null,
  };

  $scope.arrangeData = {
    id: [],
    position: [],
  };

  // GEt
  $http.get("/api/Segment").then(
    (response) => {
      $scope.moduleData = response.data;
      console.log($scope.moduleData);
    },
    (error) => {
      alert(response);
    }
  );

  // click options
  $scope.OnModuleClick = (module) => {
    $scope.Exercises = module.moduleId ? module.Exercises : null;
    console.log(`Module #${module.moduleId} click`);
    console.log(module.Exercises);
  };
  $scope.OnExerciseClick = (exercise) => {
    $scope.Tasks = exercise.Tasks;
    console.log(`Exercise #${exercise.exerciseId} click`);
  };

  // Model: post Record
  $scope.OnPostData = (data, type, id) => {
    $scope.insert = data;
    document.getElementById("id01").style.display = "block";
    $scope.form.id = id;
    $scope.requestType = type;
    //console.log('module Added successfully');
  };

  //insert record and update record
  $scope.OnPutData = (name, type, data) => {
    $scope.insert = name;
    recid = name.toLowerCase() + "Id";
    recname = name.toLowerCase() + "Name";
    recdescription = name.toLowerCase() + "Description";
    reccategory = name.toLowerCase() + "Category";
    document.getElementById("id01").style.display = "block";
    $scope.form.id = data[recid];
    $scope.form.name = data[recname];

    $scope.form.description = data[recdescription];
    $scope.form.category = data[reccategory];

    $scope.requestType = type;
  };

  // Delete Record - hide it
  $scope.OnDeleteData = (data, id) => {
    if (data == "Module") {
      $http.delete("/api/Segment?id=" + id).then(
        (d) => {
          console.log(d.data);
          window.alert(d.data.Message);
          $http.get("/api/Segment").then(
            (d) => {
              $scope.data = d.data;
              console.log(d.data);
            },
            (error) => {
              alert(d);
            }
          );
        },
        (error) => {
          alert(d);
        }
      );
    } else {
      $http.delete("/api/" + data + "?id=" + id).then(
        (d) => {
          console.log(d.data);
          window.alert(d.data.Message);
          $http.get("/api/Segment").then(
            (d) => {
              $scope.data = d.data;
              console.log(d.data);
            },
            (error) => {
              alert(d);
            }
          );
        },
        (error) => {
          alert(error);
        }
      );
    }
  };

  // model: OnSubmit Record
  $scope.OnSubmitData = () => {
    console.log("submited", $scope.form, $scope.insert);
    name = $scope.insert.toLowerCase() + "Name";
    description = $scope.insert.toLowerCase() + "Description";
    category = $scope.insert.toLowerCase() + "Category";
    data = {};
    (data[name] = $scope.form.name),
      (data[description] = $scope.form.description),
      (data[category] = $scope.form.category),
      console.log(data);
    if ($scope.requestType == "post") {
      if ($scope.insert == "Module") {
        $http.post("/api/Segment", data).then(
          (d) => {
            console.log(d.data);
            window.alert(d.data.Message);
            $http.get("/api/Segment").then(
              (d) => {
                $scope.data = d.data;
                console.log(d.data);
              },
              (error) => {
                alert(d);
              }
            );
          },
          (error) => {
            alert(d);
          }
        );
      } else {
        $http
          .post("/api/" + $scope.insert + "?id=" + $scope.form.id, data)
          .then(
            (d) => {
              console.log(d.data);
              window.alert(d.data.Message);
              $http.get("/api/Segment").then(
                (d) => {
                  $scope.data = d.data;
                  console.log(d.data);
                },
                (error) => {
                  alert(d);
                }
              );
            },
            (error) => {
              alert(error);
            }
          );
      }
    } else {
      if ($scope.insert == "Module") {
        $http.put("/api/Segment?id=" + $scope.form.id, data).then(
          (d) => {
            console.log(d.data);
            window.alert(d.data);
            $http.get("/api/Segment").then(
              (d) => {
                $scope.data = d.data;
                console.log(d.data);
              },
              (error) => {
                alert(d);
              }
            );
          },
          (error) => {
            alert(d);
          }
        );
      } else {
        $http.put("/api/" + $scope.insert + "?id=" + $scope.form.id, data).then(
          (d) => {
            console.log(d.data);
            window.alert(d.data);
            $http.get("/api/Segment").then(
              (d) => {
                $scope.data = d.data;
                console.log(d.data);
              },
              (error) => {
                alert(d);
              }
            );
          },
          (error) => {
            alert(error);
          }
        );
      }
    }

    $scope.form = {
      id: 0,
      name: null,
      description: null,
      category: null,
    };
    document.getElementById("id01").style.display = "none";
  };

  $scope.OnCancel = () => {
    var rForm = document.getElementById("rFormId");
    var mForm = document.getElementById("mFormId");
    mForm.reset();
    rForm.reset();
    document.getElementById("id01").style.display = "none";
    document.getElementById("id02").style.display = "none";
  };

  $scope.OnClose = () => {
    console.log("close box");
  };

  $scope.openExercise = (data) => {
    console.log(data);
    $scope.exercise = data.Exercises;
    $scope.exerciseData = data.Exercises;
  };

  $scope.OnRestore = (data, id) => {
    $http.get(`/api/${data == "Module" ? "Segment" : data}?id=${id}`).then(
      (response) => {
        alert("Data Restored !!");
      },
      (error) => {
        alert(response);
      }
    );
  };

  $scope.OnMoveData = (name, data) => {
    $rootScope.RearrangeData = data;
    $scope.type = name;
    $rootScope.idRD = `${name.toLowerCase()}Id`;
    $rootScope.nameRD = `${name.toLowerCase()}Name`;
    document.getElementById("id02").style.display = "block";
    console.log(data);
  };

  $scope.handleRearrangeData = () => {
    $http
      .put(
        `/api/${$scope.type == "Module" ? "Segment" : $scope.type}`,
        $scope.arrangeData
      )
      .then(
        (response) => {
          alert("Rearrange Data Successfuly !!");
          $scope.OnCancel();
        },
        (error) => {
          alert(response);
        }
      );
    console.log("ArrangeData", $scope.arrangeData);
  };
});

var modal = document.getElementById("id01");

// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
