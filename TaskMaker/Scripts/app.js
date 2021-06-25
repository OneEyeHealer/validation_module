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

  // column Title
  $rootScope.TModule = "Modules";
  $rootScope.TExercise = "Exercises";
  $rootScope.TTask = "Tasks";

  $rootScope.RearrangeData = [];
  $rootScope.idRD = null;
  $rootScope.nameRD = null;

  $rootScope.currentTime = new Date().toLocaleTimeString();
});

app.controller("moduleController", ($scope, $rootScope, $http) => {
  // variables
  $scope.search = "";
  $scope.showModule = false;
  $scope.showExercise = false;
  $scope.showTask = false;

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

  //search
  $scope.OnSearch = (value) => {
    $scope.search = value;
    $scope.getData();
  };

  $scope.filterData = () => {
    return $scope.moduleData.filter((data) =>
      data.moduleName.toLowerCase().includes($scope.search.toLowerCase())
    );
  };

  // GEt
  $scope.getData = () => {
    $http.get("/api/Segment").then(
      (response) => {
        $scope.moduleData =
          $scope.search == "" ? response.data : $scope.filterData();
      },
      (error) => {
        alert(response);
      }
    );
  };
  $scope.getData();

  // click options
  $scope.OnModuleClick = (key, module) => {
    //debugger
    module.show = module.show == undefined || module.show == false;

    $scope.Mkey = key;
    $scope.showModule = module.show;
    $scope.Exercises =
      `module-${module.moduleId}` == key ? module.Exercises : null;
    console.log(`Module #${key} click`);
  };
  $scope.OnExerciseClick = (key, exercise) => {
    exercise.show = exercise.show == undefined || exercise.show == false;
    $scope.showExercise = exercise.show;
    $scope.Ekey = key;
    $scope.Tasks =
      `exercise-${exercise.exerciseId}` == key ? exercise.Tasks : null;
    //$scope.Tasks = exercise.Tasks;
    console.log(`Exercise #${key} click`);
  };

  $scope.OnTaskClick = (key, task) => {
    //debugger
    task.show = task.show == undefined || task.show == false;
    $scope.showTask = task.show;
    $scope.Tkey = key;
    //$scope.Tasks = task.Tasks;
    console.log(`Task #${key} click`);
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
    $http.delete(`/api/${data == "Module" ? "Segment" : data}?id=${id}`).then((d) => {
        console.log(d.data);
        $scope.Toastfy("Delete", d.data.Message, "delete");
        $http.get("/api/Segment").then((d) => {
            $scope.data = d.data;
            console.log(d.data);
          },
          (error) => {
            alert(error);
          }
        );
      },
      (error) => {
        alert(error);
      }
    );
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
      $http
        .post(
          `/api/${$scope.insert == "Module" ? "Segment" : $scope.insert}?id=${
            $scope.form.id
          }`,
          data
        )
        .then(
          (d) => {
            console.log(d.data);
            $scope.Toastfy("Post Request", d.data.Message, "success");
            $http.get("/api/Segment").then(
              (d) => {
                $scope.data = d.data;
                console.log(d.data);
              },
              (error) => {
                alert(error);
              }
            );
          },
          (error) => {
            alert(error);
          }
        );
    } else {
      $http
        .put(
          `/api/${$scope.insert == "Module" ? "Segment" : $scope.insert}?id=${
            $scope.form.id
          }`,
          data
        )
        .then(
          (d) => {
            console.log(d.data);
            $scope.Toastfy("Update Request", d.data, "success");
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
        $scope.Toastfy("Restore", "Data Restored !!", "success");
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
  $scope.Toastfy = (title, message, type) => {
    $scope.toastTitle = title;
    $scope.toastMessage = message;
    $scope.toastType = type;
    $scope.OpenToast();
    location.reload();
  };

  $scope.OpenToast = () => {
    var option = {
      animation: true,
      delay: 2000,
    };
    var toastEvent = document.getElementById("liveToast");
    var toastInstance = new bootstrap.Toast(toastEvent, option);
    toastInstance.show();
  };
});

app.controller("DemoController", function ($scope) {
  $scope.dropCallback = function (index, item, external, type) {
    var model = $scope.models.dropzones;
    for (var y in model.B) {
      for (var zz in model.B[y].columns) {
        var myColumns = [];
        var foundThem = false;
        if (Array.isArray(model.B[y].columns[zz])) {
          $scope.models.dropzones.B[y].columns.splice(zz, 1);
        }
      }
    }

    return item;
  };

  $scope.models = {
    selected: null,
    templates: [
      {
        type: "item",
        id: 2,
      },
      {
        type: "container",
        id: 1,
        columns: [[]],
      },
    ],
    dropzones: {
      Data: [
        {
          id: "module-1",
          type: "container",
          columns: [
            { id: "exercise-1", type: "item" },
            { id: "exercise-2", type: "item" },
          ],
        },
        {
          id: "module-1",
          type: "item",
        },
      ],
      B: [
        {
          type: "item",
          id: 7,
        },
        {
          type: "item",
          id: 8,
        },
        {
          type: "container",
          id: 1,
          columns: [
            {
              type: "item",
              id: 2,
            },
            {
              type: "item",
              id: 3,
            },
          ],
        },
        {
          type: "container",
          id: 2,
          columns: [
            {
              type: "item",
              id: 9,
            },
            {
              type: "item",
              id: 10,
            },
            {
              type: "item",
              id: 11,
            },
          ],
        },
        {
          type: "item",
          id: 16,
        },
      ],
    },
  };

  $scope.$watch(
    "models.dropzones",
    function (model) {
      $scope.modelAsJson = angular.toJson(model, true);
    },
    true
  );
});

var modal = document.getElementById("id01");

// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
