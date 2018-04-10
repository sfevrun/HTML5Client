var auteurCtrl =  function ($scope, $element, ModalService, rhService, filterFilter) {

 
$scope.auteurs=[];
rhService.getAllAuteur().then(
  
               function (results) {
      
                   $scope.auteurs = results.data;
                   $scope.CRUDresult = "Data updated with success"
               });

      $scope.showAuteur= function (auteurID) {
        ModalService.showModal({
            templateUrl: "App/auteur/ModalAuteur.html",
            controller: "auteurPopCtrl",
            windowClass: 'app-modal-window',
            inputs: {
                title: (auteurID == null) ? "Ajouter Auteur" : " Editer auteur: " + auteurID,
                auteurID: auteurID
            }
        }).then(function (modal) {
            modal.element.modal(); // open the modal form
            modal.close.then(
              function (result) {
                  $scope.complexResult = modal.scope.CRUDresult;
                  if ($scope.complexResult.success) {
                    
                      rhService.getAllLivre().then(
               function (results) {
                   $scope.personnes = results.data;
                   $scope.CRUDresult = "Data updated with success"
               });
         }
              });
        });

    };
      $scope.valuePerPage = ['10', '20', '50', '100']
      $scope.sort = function (keyname) {
          $scope.sortKey = keyname;   //set the sortKey to the param passed
          $scope.reverse = !$scope.reverse; //if true make it false and vice versa
      }
      $scope.numberPage = '10';
  } 
auteurCtrl.$inject = ['$scope', '$element', 'ModalService','rhService', 'filterFilter'];




  var  auteurPopCtrl= function ($scope, $element, rhService, $location, $timeout, $q, $log, filterFilter ,title, close, auteurID) {
      $scope.auteur = {};
   $scope.typeauteurs=[{value:'PRINCIPAL'},{value:'COAUTEUR'}];
      $scope.id = auteurID;
      $scope.Updating = true;
      $scope.CRUDresult = "";
      $scope.title = title;
  if ($scope.id) {
         rhService.getAuteur($scope.id).then(
             function (results) {
                 // on success
                 $scope.auteur = results.data;
             },
              function (results) {
                  $scope.CRUDresult = "Data failed to load with status : " + results.data;
                  alert(results.data);
              }
             );
    }


        $scope.close = function () {
            rhService.postAuteur($scope.auteur).then(
                   function (results) {
                       // on success
                       $scope.CRUDresult = results.data;
                   },
                   function (results) {
                    //   alert(results.data);
                       $scope.CRUDresult = results.data;
                   });
                                        
          close({
             dataState: $scope.CRUDresult
            
         },        
          800);
         // close, but give 500ms for bootstrap to animate
     //   return (window.location.reload());
         };

        
       //////////////////////////////////
        
    } 
  auteurPopCtrl.$inject = ['$scope','$element', 'rhService', '$location', '$timeout', '$q', '$log', 'filterFilter', 'title', 'close', 'auteurID'];
