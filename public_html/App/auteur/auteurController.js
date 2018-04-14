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
                  if ($scope.complexResult) {
                        $scope.auteurs.forEach(function(v) {
                            if(v.id == $scope.complexResult.id) {//v.reply_content = 'dddddd';
                             var index = $scope.auteurs.indexOf(v);
                               $scope.auteurs.splice(index, 1); 
                           }
                         });
                        $scope.auteurs.splice(0, 0, $scope.complexResult);//($scope.complexResult);
               
            
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
   // $scope.typeauteurs=[{value:'PRINCIPAL'},{value:'COAUTEUR'}];
     $scope.typeauteurs=['PRINCIPAL','COAUTEUR'];
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

    $scope._type={};
        $scope.close = function () {
            $scope._type.value= $scope.auteur.type;
            $scope.auteur.type= $scope._type;
             if ($scope.id) {
                   rhService.putAuteur($scope.id,$scope.auteur).then(
                   function (results) {
                        $scope.CRUDresult = results.data;
                    },
                   function (results) {
                      $scope.CRUDresult = results.data;
                   });
          
             }else{
            
            
            rhService.postAuteur($scope.auteur).then(
                   function (results) {
                       // on success
                       $scope.CRUDresult = results.data;
                   },
                   function (results) {
                    //   alert(results.data);
                       $scope.CRUDresult = results.data;
                   });
               }
                                        
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
