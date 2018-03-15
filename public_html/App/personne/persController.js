var persCtrl =  function ($scope, $element, ModalService, rhService, filterFilter) {

 
$scope.personnes=[];
rhService.getAllPersonne().then(
  
               function (results) {
      
                   $scope.personnes = results.data;
                   $scope.CRUDresult = "Data updated with success"
               });


      $scope.showPersonne= function (personneID) {
        ModalService.showModal({
            templateUrl: "App/personne/ModalPersonne.html",
            controller: "persPopCtrl",
            windowClass: 'app-modal-window',
            inputs: {
                title: (personneID == null) ? "Ajouter personne" : " Edit personne: " + personneID,
                personneID: personneID
            }
        }).then(function (modal) {
            modal.element.modal(); // open the modal form
            modal.close.then(
              function (result) {
                  $scope.complexResult = modal.scope.CRUDresult;
                  if ($scope.complexResult.success) {
                    
                      rhService.getAllPersonne().then(
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
persCtrl.$inject = ['$scope', '$element', 'ModalService','rhService', 'filterFilter'];




  var  persPopCtrl= function ($scope, $element, rhService, $location, $timeout, $q, $log, filterFilter ,title, close, personneID) {
      $scope.personne = {};
    
      $scope.id = personneID;
      $scope.Updating = true;
      $scope.CRUDresult = "";
      $scope.title = title;
  if ($scope.id) {
         rhService.getPersonne($scope.id).then(
             function (results) {
                 // on success
                 $scope.personne = results.data;
             },
              function (results) {
                  $scope.CRUDresult = "Data failed to load with status : " + results.data;
                  alert(results.data);
              }
             );
    }
    
        $scope.close = function () {
            rhService.postPersonne($scope.personne).then(
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
  persPopCtrl.$inject = ['$scope','$element', 'rhService', '$location', '$timeout', '$q', '$log', 'filterFilter', 'title', 'close', 'personneID'];
