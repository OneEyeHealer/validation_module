var app = angular.module("myApp", ["dndLists"]);

app.run(($rootScope) => {
    $rootScope.isNumber = [0 - 9] + $;
    var mrestore = document.getElementById('MRestore');
    var erestore = document.getElementById('ERestore');
    var trestore = document.getElementById('TRestore');
    mrestore.innerHTML = `<i class="fa fa-refresh"></i>`;
    erestore.innerHTML = `<i class="fa fa-refresh"></i>`;
    trestore.innerHTML = `<i class="fa fa-refresh"></i>`;
    
    var CM = document.getElementById('CModule');
    var RM = document.getElementById('RModule');

    var CE = document.getElementById('CExercise');
    var RE = document.getElementById('RExercise');

    var CT = document.getElementById('CTask');
    var RT = document.getElementById('RTask');

    CM.innerHTML = `<i class="fa fa-plus"></i>`;
    RM.innerHTML = `<i class="fa fa-undo"></i>`;

    CE.innerHTML = `<i class="fa fa-plus"></i>`;
    RE.innerHTML = `<i class="fa fa-undo"></i>`;

    CT.innerHTML = `<i class="fa fa-plus"></i>`;
    RT.innerHTML = `<i class="fa fa-undo"></i>`;
  // create variable
    $rootScope.CModule = "+ Create Module";
    //$rootScope.CExercise = ;
  $rootScope.CTask = "+ Create Task";

  // rearrange variable
  $rootScope.RModule = "Rearrange Module";
  $rootScope.RExercise = "Rearrange Exercise";
  $rootScope.RTask = "Rearrange Task";

  // column Title
  $rootScope.TModule = "Modules";
  $rootScope.TExercise = "Exercises";
    $rootScope.TTask = "Tasks";

    $rootScope.rootExercise = [];
    $rootScope.rootTask = [];

  $rootScope.RearrangeData = [];
  $rootScope.idRD = null;
$rootScope.nameRD = null;
$rootScope.loadingData = 3;

  $rootScope.currentTime = new Date().toLocaleTimeString();
});

app.controller("moduleController", ($scope, $rootScope, $http) => {
  // variables
  $scope.search = "";
  $scope.showModule = false;
  $scope.showExercise = false;
  $scope.showTask = false;
    //Archive data
    $scope.showArchive = false;
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
    $scope.check = (data,index) => {
        var ele = parseInt(data.target.value)
        console.log($scope.arrangeData.position)
        for (var i = 0; i < $scope.arrangeData.position.length ; i++) {

            if ($scope.arrangeData.position[i] == ele && i!=index) {
                console.log("same");
                delete $scope.arrangeData.position[index]
                console.log($scope.arrangeData.position)
                break;
            }
            else {
                console.log("different");
            }
        }
    }
  // GEt
    $scope.isOnline = false;
    $scope.sortType = "Asc";
  $scope.getData = () => {
    $http.get("/api/Segment").then(
        (response) => {
            $scope.isOnline = response.status == 200;
            $scope.moduleData = $scope.search == "" ? response.data : $scope.filterData();
            $scope.PaginateResponse = [], $scope.currentPage = 1, $scope.numPerPage = $scope.pageSize == null ? 5 : $scope.pageSize, $scope.maxSize = 5;
            $scope.mdata = response.data;
            $scope.pages = Math.ceil($scope.mdata.length / $scope.numPerPage);
            $scope.pageArray = [];
            for (let i = 0; i < $scope.pages; i++) {
                $scope.pageArray.push(parseInt(i));
            }
            $scope.paginatePages = (items) => {
                $scope.currentPage = items;
            }
            $scope.makeData = () => {
                $scope.mdata = [];
                for (i = 0; i < response.data.length; i++) {
                    $scope.mdata.push(response.data[i]);
                }
            };
            $scope.makeData();

            $scope.$watch('currentPage + numPerPage', () => {
                var begin = (($scope.currentPage - 1) * $scope.numPerPage), end = begin + $scope.numPerPage;
                $scope.moduleData = $scope.search == "" ? ($scope.isOnline ? $scope.mdata.slice(begin, end) : null) : $scope.filterData();
            });
            $scope.OnSortData = () => {
                $scope.isSort = $scope.isSort == undefined || $scope.isSort == false;

                $scope.sortType = null;
                $scope.sortType = $scope.isSort ? 'Asc' : "Desc";
                if ($scope.sortType == 'Asc') {
                    $scope.moduleData.sort((a, b) => {
                        let fa = a.moduleName.toLowerCase(), fb = b.moduleName.toLowerCase();
                        if (fa < fb) return -1;
                        if (fa > fb) return 1;
                        return 0;
                    });
                }
                else {
                    $scope.moduleData.sort((a, b) => {
                        let fa = a.moduleName.toLowerCase(), fb = b.moduleName.toLowerCase();
                        if (fa > fb) return -1;
                        if (fa < fb) return 1;
                        return 0;
                    });
                }
            }
      },
      (error) => {
        alert(response);
      }
    );
    };
    $scope.getData();

    $scope.OnPageSizeChange = (value) => {
        $scope.pageSize = value;
        $scope.getData();
    }
    //Archive function
    $scope.OnArchive = () => {
        $scope.showArchive = true;
    }
    $scope.OnBackArchive = () => {
        $scope.showArchive = false;
    }
  // click options
  $scope.OnModuleClick = (key, module) => {
    //debugger
    module.show = module.show == 'undefined' || module.show == false;
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
    $http.delete(`/api/${data == "Module" ? "Segment" : data}?id=${id}`).then((response) => {
        $scope.Toastfy("Delete", `${data} ${response.data.Message}.`, "delete");
        //$scope.showModule = false;
        //$scope.showExercise = false;
        //$scope.showTask = false;
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
        .post(`/api/${$scope.insert == "Module" ? "Segment" : $scope.insert}?id=${$scope.form.id}`,data)
        .then(
          (response) => {
                $scope.Toastfy(`New ${$scope.insert} `, `${response.data.Message}.`, "success");
                console.log(response);
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
          (response) => {
                $scope.Toastfy("Update Request", `${response.data}.`, "success");
                console.log(response);
          },
          (error) => {
            alert(error);
          }
        );
      }
    $scope.OnCancel();
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
    $scope.exercise = data.Exercises;
    $scope.exerciseData = data.Exercises;
  };

  $scope.OnRestore = (data, id) => {
    $http.get(`/api/${data == "Module" ? "Segment" : data}?id=${id}`).then(
      (response) => {
            $scope.Toastfy("Restore", `#${id} of ${data} ${response.data}.`, "success");
            //$scope.showModule = false;
            //$scope.showExercise = false;
            //$scope.showTask = false;
      },
      (error) => {
        alert(response);
      }
    );
    $scope.getData();
  };

  $scope.OnMoveData = (name, data) => {
    $rootScope.RearrangeData = data;
    $scope.type = name;
    $rootScope.idRD = `${name.toLowerCase()}Id`;
    $rootScope.nameRD = `${name.toLowerCase()}Name`;
    document.getElementById("id02").style.display = "block";
  };

  $scope.handleRearrangeData = () => {
    $http
      .put(
        `/api/${$scope.type == "Module" ? "Segment" : $scope.type}`,
        $scope.arrangeData
      )
      .then(
          (response) => {
          $scope.Toastfy("Rearrange Data", "Rearrange Data Successfuly !!", "success");
          $scope.OnCancel();
        },
        (error) => {
          alert(response);
        }
      );
      console.log("ArrangeData", $scope.arrangeData);
      $scope.arrangeData = {
          id: [],
          position: [],
      };
    };
    $scope.newPosition = 0; 
    $scope.CheckPosition = (event) => {
        console.log(event);
    }
  $scope.Toastfy = (title, message, type) => {
    $scope.toastTitle = title;
    $scope.toastMessage = message;
    $scope.toastType = type;
      $scope.OpenToast();
      $scope.getData();
    //location.reload();
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

