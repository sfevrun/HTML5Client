var pretCtrl =  function ($scope, $element, ModalService, rhService, filterFilter) {

 
$scope.prets=[];
rhService.getAllPret().then(
  
               function (results) {
              //     alert($scope.vehicule);
                   $scope.prets = results.data;
                   $scope.CRUDresult = "Data updated with success"
               });


      $scope.showPret = function (pretID) {
        ModalService.showModal({
            templateUrl: "App/pret/ModalPret.html",
            controller: "pretPopCtrl",
            windowClass: 'app-modal-window',
            inputs: {
                title: (pretID == null) ? "Ajouter pret" : " Edit pret: " + pretID,
                pretID: pretID
            }
        }).then(function (modal) {
            modal.element.modal(); // open the modal form
            modal.close.then(
              function (result) {
                  $scope.complexResult = modal.scope.CRUDresult;
                  if ($scope.complexResult) {
                        $scope.prets.forEach(function(v) {
                            if(v.id == $scope.complexResult.id) {//v.reply_content = 'dddddd';
                             var index = $scope.prets.indexOf(v);
                               $scope.prets.splice(index, 1); 
                           }
                         });
                      $scope.prets.splice(0, 0, $scope.complexResult);//($scope.complexResult);
               
            
                    
             
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
pretCtrl.$inject = ['$scope', '$element', 'ModalService','rhService', 'filterFilter'];




  var  pretPopCtrl= function ($scope, $element, rhService, $location, $timeout, $q, $log, filterFilter ,title, close, pretID) {
      $scope.pret = {};
    
      $scope.id = pretID;
      $scope.Updating = true;
      $scope.CRUDresult = "";
      $scope.title = title;
  if ($scope.id) {
         rhService.getPret($scope.id).then(
             function (results) {
                 // on success
                 $scope.pret = results.data;
             },
              function (results) {
                  $scope.CRUDresult = "Data failed to load with status : " + results.data;
                  alert(results.data);
              }
             );
    }
    $scope.livres=[];
rhService.getAllLivre().then(
  
               function (results) {
      
                   $scope.livres = results.data;
                   $scope.CRUDresult = "Data updated with success"
               });
               
               $scope.users=[];
rhService.getAllUser().then(
  
               function (results) {
              //     alert($scope.vehicule);
                   $scope.users = results.data;
                   $scope.CRUDresult = "Data updated with success"
               });
        $scope.close = function () {
            rhService.postPret($scope.pret).then(
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
  pretPopCtrl.$inject = ['$scope','$element', 'rhService', '$location', '$timeout', '$q', '$log', 'filterFilter', 'title', 'close', 'pretID'];
