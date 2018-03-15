var app = angular.module('rhApp',
    ['angularModalService', 'validation.match', 'ui.bootstrap', 'ui.bootstrap.datetimepicker']);
var url = "";
app.controller('rhCtrl', ['$scope', 'ModalService', 'rhService', '$window', function ($scope, ModalService, rhService, $window) {
    $scope.complexResult = null;
    $scope.pieces = null;
    $scope.Accessoires = null;

    $scope.annee = 0;
    $scope.mois = 0;
    $scope.jour = 0;
    $scope.desti = 0;
    rhService.getAllPiece1().then(
             function (results) {
                 $scope.pieces = results.data;
                 $scope.CRUDresult = "Data updated with success"
             });

    rhService.getAllAccessoires().then(
            function (results) {
                $scope.Accessoires = results.data;
                $scope.CRUDresult = "Data updated with success"
            });
    //         //////////////////////////////////
    //$scope.typeVehicules = null;
    //rhService.getAllTypeVehicule().then(
    //         function (results) {         
    //             $scope.typeVehicules = results.data;
    //             $scope.CRUDresult = "Data updated with success"
    //         });
    $scope.statusCam = null;
    $scope.filShow = null;
    $scope.change = function () {
        $scope.filShow = 1;
    }
    $scope.file_changed = function (element, $scope) {

        $scope.$apply(function (scope) {
            $scope.filShow = 0;
        });
    };

    $scope.uploadImage = function () {
        $scope.filShow = 1;
        console.log("Changed");
    }

    //////////////////////Immeuble/////////////////////
    $scope.showVehicule = function (vehiculeId) {
        ModalService.showModal({
            templateUrl: "App/vehicule/ModalVehicule",
            controller: "vCtrl",
            windowClass: 'app-modal-window',
            inputs: {
                title: (vehiculeId == null) ? "Ajouter un nouveau vehicule" : " Edit vehicule: " + vehiculeId,
                vehiculeId: vehiculeId
            }
        }).then(function (modal) {
            modal.element.modal(); // open the modal form

            modal.close.then(
                function (result) {
                    $scope.complexResult = modal.scope.CRUDresult;
                    if (result.dataState) {
                        // promise if success
                        // $scope.complexResult = modal.scope.CRUDresult;
                    }

                });
        });

    };


    $scope.showPersonnel = function (personnelId) {
        ModalService.showModal({
            templateUrl: "App/personnel/ModalPersonnel",
            controller: "persCtrl",
            windowClass: 'app-modal-window',
            inputs: {
                title: (personnelId == null) ? "Ajouter une nouvelle personne" : " Edit personnel : " + personnelId,
                personnelId: personnelId
            }
        }).then(function (modal) {
            modal.element.modal(); // open the modal form

            modal.close.then(
                function (result) {
                    $scope.complexResult = modal.scope.CRUDresult;
                    if (result.dataState) {
                        // promise if success
                        // $scope.complexResult = modal.scope.CRUDresult;
                    }

                });
        });

    };
    //////////////////////Consommation/////////////////////
    $scope.showConsommation = function (consommationID) {
        ModalService.showModal({
            templateUrl: "../App/consomation/ModalConsommationCamion",
            controller: "conCtrl",
            windowClass: 'app-modal-window',
            inputs: {
                title: (consommationID == null) ? "Ajouter consommation" : " Edit consommation: " + consommationID,
                consommationID: consommationID
            }
        }).then(function (modal) {
            modal.element.modal(); // open the modal form
            modal.close.then(
              function (result) {
                  $scope.complexResult = modal.scope.CRUDresult;
                  if (result.dataState) {
                      // promise if success
                      // $scope.complexResult = modal.scope.CRUDresult;
                      var ur = '@Url.Action("CamionList", "Consommation")';
                      $('#replacetarget').load(ur);
                      //debugger;           


                  }

              });
        });

    };

    ///////////////////////////////////////////////////
    $scope.showConAutre = function (consommationID) {
        ModalService.showModal({
            templateUrl: "../App/consomation/ModalConsommationAutre",
            controller: "conCtrl",
            windowClass: 'app-modal-window',
            inputs: {
                title: (consommationID == null) ? "Ajouter consommation" : " Edit consommation: " + consommationID,
                consommationID: consommationID
            }
        }).then(function (modal) {
            modal.element.modal(); // open the modal form

            modal.close.then(
                function (result) {
                    $scope.complexResult = modal.scope.CRUDresult;
                    if (result.dataState) {
                        // promise if success
                        // $scope.complexResult = modal.scope.CRUDresult;
                    }

                });
        });

    };


    /////////////////////////////////////////
    $scope.showConForklitf = function (consommationID) {
        ModalService.showModal({
            templateUrl: "../App/consomation/ModalConsommationForklitf",
            controller: "conCtrl",
            windowClass: 'app-modal-window',
            inputs: {
                title: (consommationID == null) ? "Ajouter consommation" : " Edit consommation: " + consommationID,
                consommationID: consommationID
            }
        }).then(function (modal) {
            modal.element.modal(); // open the modal form

            modal.close.then(
                function (result) {
                    $scope.complexResult = modal.scope.CRUDresult;
                    if (result.dataState) {
                        // promise if success
                        // $scope.complexResult = modal.scope.CRUDresult;
                    }

                });
        });

    };
    ///////////////////////////////////////////

    $scope.saveTypeVehicule = function () {
        // insert new Agent
        rhService.postTypeVehicule($scope.typeVehicule).then(
             function (results) {
                 // on success
                 $scope.CRUDresult = results.data;
             },
             function (results) {
                 alert(results.data);
                 $scope.CRUDresult = results.data;
             })

        return (window.location.reload());

    };
    /////////////////////////////////////////////////////



    ///////////////////////////////////////////////////////////

    $scope.showReceptionpp = function (receptionID) {
        ModalService.showModal({
            templateUrl: "App/powerplant/ModalReception",
            controller: "recepCtrl",
            windowClass: 'app-modal-window',
            inputs: {
                title: (receptionID == null) ? "Ajouter reception" : " Edit reception : " + receptionID,
                receptionID: receptionID
            }
        }).then(function (modal) {
            modal.element.modal(); // open the modal form

            modal.close.then(
                function (result) {
                    $scope.complexResult = modal.scope.CRUDresult;
                    if (result.dataState) {
                        // promise if success
                        // $scope.complexResult = modal.scope.CRUDresult;
                    }

                });
        });

    };
    ////////////////Etat Journalier////////////////////////
    $scope.showEtatJounalierPP = function (EtatID) {
        ModalService.showModal({
            templateUrl: "App/powerplant/ModalEtatJournalier",
            controller: "etajCtrl",
            windowClass: 'app-modal-window',
            inputs: {
                title: (EtatID == null) ? "Ajouter etat" : " Editer etat: " + EtatID,
                EtatID: EtatID
            }
        }).then(function (modal) {
            modal.element.modal(); // open the modal form

            modal.close.then(
                function (result) {
                    $scope.complexResult = modal.scope.CRUDresult;
                    if (result.dataState) {
                        // promise if success
                        // $scope.complexResult = modal.scope.CRUDresult;
                    }

                });
        });

    };
    //////////////////////Reparation/////////////////////
    $scope.showReparation = function (reparationID) {
        ModalService.showModal({
            templateUrl: "App/reparation/ModalReparation",
            controller: "repCtrl",
            windowClass: 'app-modal-window',
            inputs: {
                title: (reparationID == null) ? "Ajouter Reparation" : " Editer reparation: " + reparationID,
                reparationID: reparationID
            }
        }).then(function (modal) {
            modal.element.modal(); // open the modal form

            modal.close.then(
                function (result) {
                    $scope.complexResult = modal.scope.CRUDresult;
                    if (result.dataState) {
                        // promise if success
                        // $scope.complexResult = modal.scope.CRUDresult;
                    }

                });
        });

    };
    //////////////////////////////////////////////////////////////
    $scope.showReparationCamion = function (reparationID) {
        ModalService.showModal({
            templateUrl: "/App/reparation/ModalReparationCamion",
            controller: "repCtrl",
            windowClass: 'app-modal-window',
            inputs: {
                title: (reparationID == null) ? "Ajouter Reparation" : " Editer reparation: " + reparationID,
                reparationID: reparationID
            }
        }).then(function (modal) {
            modal.element.modal(); // open the modal form

            modal.close.then(
                function (result) {
                    $scope.complexResult = modal.scope.CRUDresult;
                    if (result.dataState) {
                        // promise if success
                        // $scope.complexResult = modal.scope.CRUDresult;
                    }

                });
        });

    };
    //////////////////////commande Piece/////////////////////
    $scope.showCommande = function (commandePieceID) {
        ModalService.showModal({
            templateUrl: "App/piece_stock/ModalCommandePiece",
            controller: "rcomCtrl",
            windowClass: 'app-modal-window',
            inputs: {
                title: (commandePieceID == null) ? "Ajouter commande" : " Editer commande: " + commandePieceID,
                commandePieceID: commandePieceID
            }
        }).then(function (modal) {
            modal.element.modal(); // open the modal form

            modal.close.then(
                function (result) {
                    $scope.complexResult = modal.scope.CRUDresult;
                    if (result.dataState) {
                        // promise if success
                        // $scope.complexResult = modal.scope.CRUDresult;
                    }

                });
        });

    };


    //////////////////Detail Reparation////////////////////
    $scope.Updating = true;
    //  $scope.destinations = ['Delmas', 'Tabarre','Petion-Ville']
    //////////////////////////////////////////////
    // $scope.detailID = null;
    // $scope.detailrep = {};

    //////////////////////////////////////
    if ($scope.id_Reparation) {
        $scope.readonly = false;
        rhService.getDetailReparation($scope.id_DetailReparation).then(
             function (results) {
                 // on success
                 $scope.detailrep = results.data;
             },
              function (results) {
                  $scope.CRUDresult = "Data failed to load with status : " + results.data;
                  alert(results.data);
              }
             );
    }
    else {
        //
        $scope.Updating = false;
    }
    $scope.detailrep = {};
    //$scope.detailrep.reparationConcerner = $scope.repc;

    /////////////////////////////////////////
    $scope.saveDetailRep = function () {
        // insert new Agent
        rhService.postDetailReparation($scope.detailrep).then(
             function (results) {
                 // on success
                 $scope.CRUDresult = results.data;
             },
             function (results) {
                 alert(results.data);
                 $scope.CRUDresult = results.data;
             })

        return (window.location.reload());

    };
    //////////////////////////////////

    //$scope.detailrep.reparationConcerner = $scope.repc;
    ///////////////Detail piece////////////////////
    $scope.detailpiece = {};
    $scope.saveDetailPiece = function () {
        // insert new Agent
        rhService.postDetailPiece($scope.detailpiece).then(
             function (results) {
                 // on success
                 $scope.CRUDresult = results.data;
             },
             function (results) {
                 alert(results.data);
                 $scope.CRUDresult = results.data;
             })

        return (window.location.reload());

    };
    $scope.detailAccessoires = {};
    $scope.saveDetailAccessoires = function () {
        // insert new Agent
        rhService.postDetailAccessoires($scope.detailAccessoires).then(
             function (results) {
                 // on success
                 $scope.CRUDresult = results.data;
             },
             function (results) {
                 alert(results.data);
                 $scope.CRUDresult = results.data;
             })

        return (window.location.reload());

    };
    ////////////Delete Etat////////////////////////
    $scope.deleteEtat = function (id) {
        var deleteM = $window.confirm('voulez-vous vraiment supprimer ?' + id);
        if (deleteM) {
            rhService.deleteEtatJounalier(id).then(
               function (result) {
                   //  $window.location.reload();  // promise if success
                   $scope.complexResult = result.statusText;
               },
               function (result) {
                   $scope.complexResult = result.statusText;
               }
            )
        }
    };
    /////////////////Delete Reception//////////////////////////////
    $scope.deleteReception = function (id) {
        var deleteM = $window.confirm('voulez-vous vraiment supprimer ?' + id);
        if (deleteM) {
            rhService.deleteReception(id).then(
               function (result) {
                   //  $window.location.reload();  // promise if success
                   $scope.complexResult = result.statusText;
               },
               function (result) {
                   $scope.complexResult = result.statusText;
               }
            )
        }
    };
    ///////////////////Delete Consommation////////////////////////////////
    $scope.deleteConsommation = function (id) {
        var deleteM = $window.confirm('voulez-vous vraiment supprimer ?' + id);
        if (deleteM) {
            rhService.deleteConsomation(id).then(
               function (result) {
                   //  $window.location.reload();  // promise if success
                   $scope.complexResult = result.statusText;
                   return (window.location.reload());
               },
               function (result) {
                   $scope.complexResult = result.statusText;
               }
            )
        }
    };
    ///////////Delete Personne///////////////////////////////
    $scope.deletePersonne = function (id) {
        var deleteM = $window.confirm('voulez-vous vraiment supprimer ?' + id);
        if (deleteM) {
            rhService.deletePersonne(id).then(
               function (result) {
                   //  $window.location.reload();  // promise if success
                   $scope.complexResult = result.statusText;
               },
               function (result) {
                   $scope.complexResult = result.statusText;
               }
            )
        }
    };
    //////////////Delete Vehicule///////////////////////////////
    $scope.deleteVehicule = function (id) {
        var deleteM = $window.confirm('voulez-vous vraiment supprimer ?' + id);
        if (deleteM) {
            rhService.deleteVehicule(id).then(
               function (result) {
                   //  $window.location.reload();  // promise if success
                   $scope.complexResult = result.statusText;
               },
               function (result) {
                   $scope.complexResult = result.statusText;
               }
            )
        }
    };

    ////////////////////////////////////

}]);
////////////////////////////////////////
function ajaxResultPost(id) {
    //  alert(id);
    //   showConsommation()"
    var scope = angular.element(document.getElementById("MainWrap")).scope();
    scope.$apply(function () {
        scope.showConsommation(id);
    });
}
function ajaxResultPostAutre(id) {
    //  alert(id);
    //   showConsommation()"
    var scope = angular.element(document.getElementById("MainWrap")).scope();
    scope.$apply(function () {
        scope.showConAutre(id);
    });
}
function ajaxResultPostDelete(id) {
    //  alert(id);
    //   showConsommation()"
    var scope = angular.element(document.getElementById("MainWrap")).scope();
    scope.$apply(function () {
        scope.deleteConsommation(id);
    });
}
