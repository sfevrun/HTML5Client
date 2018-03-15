var catCtrl =  function ($scope, $element, ModalService, rhService, filterFilter) {

 
$scope.categories=[];
rhService.getAllCategorie().then(
  
               function (results) {
              //     alert($scope.vehicule);
                   $scope.categories = results.data;
                   $scope.CRUDresult = "Data updated with success"
               });


      $scope.showCategorie = function (categorieID) {
        ModalService.showModal({
            templateUrl: "App/categorie/ModalCategorie.html",
            controller: "catPopCtrl",
            windowClass: 'app-modal-window',
            inputs: {
                title: (categorieID == null) ? "Ajouter categorie" : " Edit categorie: " + categorieID,
                categorieID: categorieID
            }
        }).then(function (modal) {
            modal.element.modal(); // open the modal form
            modal.close.then(
              function (result) {
                  $scope.complexResult = modal.scope.CRUDresult;
                  if ($scope.complexResult.success) {
                    
                      rhService.getAllCategorie().then(
               function (results) {
                   $scope.categories = results.data;
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
catCtrl.$inject = ['$scope', '$element', 'ModalService','rhService', 'filterFilter'];




  var  catPopCtrl= function ($scope, $element, rhService, $location, $timeout, $q, $log, filterFilter ,title, close, categorieID) {
      $scope.categorie = {};
    
      $scope.id = categorieID;
      $scope.Updating = true;
      $scope.CRUDresult = "";
      $scope.title = title;
  if ($scope.id) {
         rhService.getCategorie($scope.id).then(
             function (results) {
                 // on success
                 $scope.categorie = results.data;
             },
              function (results) {
                  $scope.CRUDresult = "Data failed to load with status : " + results.data;
                  alert(results.data);
              }
             );
    }
    
        $scope.close = function () {
            rhService.postCategorie($scope.categorie).then(
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
  catPopCtrl.$inject = ['$scope','$element', 'rhService', '$location', '$timeout', '$q', '$log', 'filterFilter', 'title', 'close', 'categorieID'];
