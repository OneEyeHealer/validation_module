var app = angular.module("myApp", ["dndLists"]);

app.run(($rootScope) => {
    $rootScope.CModule = "+ Create Module";
    $rootScope.CExercise = "+ Create Exercise";
    $rootScope.CTask = "+ Create Task";
    $rootScope.currentTime = new Date().toLocaleTimeString();
})

app.controller("moduleController", ($scope, $rootScope, $http) => {
    //interface
    $scope.form = {
        id: 0,
        name: null,
        description: null,
        category: null
    }
    // GEt
    $http.get("/api/Segment").then((response) => {
        $scope.moduleData = response.data;
        console.log($scope.moduleData);
    }, (error) => {
        alert(response)
    })

    // click options
    $scope.OnModuleClick = (module) => {
        $scope.Exercises = module.moduleId ? module.Exercises : null;
        console.log(`Module #${module.moduleId} click`);
        console.log(module.Exercises);

    }
    $scope.OnExerciseClick = (exercise) => {
        $scope.Tasks = exercise.Tasks;
        console.log(`Exercise #${exercise.exerciseId} click`);
    }

    // Model: post Record
    $scope.OnPostData = (data, type, id) => {
        $scope.insert = data
        document.getElementById('id01').style.display = 'block'
        $scope.form.id = id
        $scope.requestType = type
        //console.log('module Added successfully');
    }

    //insert record and update record
    $scope.OnPutData = (name, type, data) => {
        $scope.insert = name
        recid = name.toLowerCase() + "Id"
        recname = name.toLowerCase() + "Name"
        recdescription = name.toLowerCase() + "Description"
        reccategory = name.toLowerCase() + "Category"
        document.getElementById('id01').style.display = 'block'
        $scope.form.id = data[recid]
        $scope.form.name = data[recname]

        $scope.form.description = data[recdescription]
        $scope.form.category = data[reccategory]

        $scope.requestType = type
    }

    // Delete Record - hide it
    $scope.OnDeleteData = (data, id) => {

        if (data == "Module") {
            $http.delete("/api/Segment?id=" + id).then((d) => {
                console.log(d.data)
                window.alert(d.data.Message)
                $http.get("/api/Segment").then((d) => {
                    $scope.data = d.data
                    console.log(d.data);
                }, (error) => {
                    alert(d)
                })
            }, (error) => {
                alert(d)
            })
        }
        else {
            $http.delete("/api/" + data + "?id=" + id).then((d) => {
                console.log(d.data)
                window.alert(d.data.Message)
                $http.get("/api/Segment").then((d) => {
                    $scope.data = d.data
                    console.log(d.data);
                }, (error) => {
                    alert(d)
                })
            }, (error) => {
                alert(error)
            })
        }
    }

    // model: OnSubmit Record
    $scope.OnSubmitData = () => {
        console.log("submited", $scope.form, $scope.insert)
        name = ($scope.insert).toLowerCase() + "Name"
        description = ($scope.insert).toLowerCase() + "Description"
        category = ($scope.insert).toLowerCase() + "Category"
        data = {}
        data[name] = $scope.form.name,
            data[description] = $scope.form.description,
            data[category] = $scope.form.category,
            console.log(data)
        if ($scope.requestType == "post") {
            if ($scope.insert == "Module") {
                $http.post("/api/Segment", data).then((d) => {
                    console.log(d.data)
                    window.alert(d.data.Message)
                    $http.get("/api/Segment").then((d) => {
                        $scope.data = d.data
                        console.log(d.data);
                    },  (error) => {
                        alert(d)
                    })
                },  (error) => {
                    alert(d)
                })
            }
            else {
                $http.post("/api/" + $scope.insert + "?id=" + $scope.form.id, data).then( (d) => {
                    console.log(d.data)
                    window.alert(d.data.Message)
                    $http.get("/api/Segment").then( (d) => {
                        $scope.data = d.data
                        console.log(d.data);
                    },  (error) => {
                        alert(d)
                    })
                },  (error) => {
                    alert(error)
                })
            }
        }
        else {
            if ($scope.insert == "Module") {
                $http.put("/api/Segment?id=" + $scope.form.id, data).then( (d) => {
                    console.log(d.data)
                    window.alert(d.data)
                    $http.get("/api/Segment").then( (d) => {
                        $scope.data = d.data
                        console.log(d.data);
                    },  (error) => {
                        alert(d)
                    })
                },  (error) => {
                    alert(d)
                })
            }
            else {
                $http.put("/api/" + $scope.insert + "?id=" + $scope.form.id, data).then((d) => {
                    console.log(d.data)
                    window.alert(d.data)
                    $http.get("/api/Segment").then((d) => {
                        $scope.data = d.data
                        console.log(d.data);
                    }, (error) => {
                        alert(d)
                    })
                }, (error) => {
                    alert(error)
                })
            }
        }

        $scope.form = {
            id: 0,
            name: null,
            description: null,
            category: null
        }
        document.getElementById('id01').style.display = 'none'

    }

    $scope.OnCancel = () => {
        $scope.form = {
            id: 0,
            name: null,
            description: null,
            category: null
        }
        document.getElementById('id01').style.display = 'none'
    }

    $scope.OnClose = () => {
        console.log("close box");
    }

    $scope.openExercise = (data) => {
        console.log(data);
        $scope.exercise = data.Exercises
        $scope.exerciseData = data.Exercises
    }

    $scope.OnRestore = (data, id) => {
        if (data == 'Module') {
            $http.get(`/api/Segment?id=${id}`).then((response) => {
                alert('Data Restored !!');
            }, (error) => {
                alert(response)
            })
        }
        else {
            $http.get(`/api/${data}?id=${id}`).then((response) => {
                alert('Data Restored !!');
            }, (error) => {
                alert(response)
            })
        }
    }
});

var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//app.controller('simpleDemoController', () => {
//    $scope.models = {
//        selected: null,
//        templates: [
//            { type: "item", id: 2 },
//            { type: "container", id: 1, columns: [[], []] }
//        ],
//        dropzones: {
//            "A": [
//                {
//                    "type": "container",
//                    "id": 1,
//                    "columns": [
//                        [
//                            {
//                                "type": "item",
//                                "id": "1"
//                            },
//                            {
//                                "type": "item",
//                                "id": "2"
//                            }
//                        ],
//                        [
//                            {
//                                "type": "item",
//                                "id": "3"
//                            }
//                        ]
//                    ]
//                },
//                {
//                    "type": "item",
//                    "id": "4"
//                },
//                {
//                    "type": "item",
//                    "id": "5"
//                },
//                {
//                    "type": "item",
//                    "id": "6"
//                }
//            ],
//            "B": [
//                {
//                    "type": "item",
//                    "id": 7
//                },
//                {
//                    "type": "item",
//                    "id": "8"
//                },
//                {
//                    "type": "container",
//                    "id": "2",
//                    "columns": [
//                        [
//                            {
//                                "type": "item",
//                                "id": "9"
//                            },
//                            {
//                                "type": "item",
//                                "id": "10"
//                            },
//                            {
//                                "type": "item",
//                                "id": "11"
//                            }
//                        ],
//                        [
//                            {
//                                "type": "item",
//                                "id": "12"
//                            },
//                            {
//                                "type": "container",
//                                "id": "3",
//                                "columns": [
//                                    [
//                                        {
//                                            "type": "item",
//                                            "id": "13"
//                                        }
//                                    ],
//                                    [
//                                        {
//                                            "type": "item",
//                                            "id": "14"
//                                        }
//                                    ]
//                                ]
//                            },
//                            {
//                                "type": "item",
//                                "id": "15"
//                            },
//                            {
//                                "type": "item",
//                                "id": "16"
//                            }
//                        ]
//                    ]
//                },
//                {
//                    "type": "item",
//                    "id": 16
//                }
//            ]
//        }
//    };

//    $scope.$watch('models.dropzones', (model) => {
//        $scope.modelAsJson = angular.toJson(model, true);
//    }, true);
//})

//app.controller("exerciseController", function ($scope, $scope) {

//    $scope.openTask = (data) => {
//        console.log(data);
//        $rootScope.task = data.Tasks
//    }

    
//})