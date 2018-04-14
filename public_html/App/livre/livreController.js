var livreCtrl =  function ($scope, $element, ModalService, rhService, filterFilter) {

 
$scope.livres=[];
rhService.getAllLivre().then(
  
               function (results) {
      
                   $scope.livres = results.data;
                   $scope.CRUDresult = "Data updated with success"
               });
$scope.categories=[];
rhService.getAllCategorie().then(
  
               function (results) {
              //     alert($scope.vehicule);
                   $scope.categories = results.data;
                   $scope.CRUDresult = "Data updated with success"
               });

rhService.getAllAuteur().then(
  
               function (results) {
      
                   $scope.auteurs = results.data;
                   $scope.CRUDresult = "Data updated with success"
               });
      $scope.showLivre= function (livreID) {
        ModalService.showModal({
            templateUrl: "App/livre/ModalLivre.html",
            controller: "livrePopCtrl",
            windowClass: 'app-modal-window',
            inputs: {
                title: (livreID == null) ? "Ajouter Livre" : " Editer livre: " + livreID,
                livreID: livreID
            }
        }).then(function (modal) {
            modal.element.modal(); // open the modal form
            modal.close.then(
              function (result) {
                  $scope.complexResult = modal.scope.CRUDresult;
                  if ($scope.complexResult) {
                        $scope.livres.forEach(function(v) {
                            if(v.id == $scope.complexResult.id) {//v.reply_content = 'dddddd';
                             var index = $scope.livres.indexOf(v);
                               $scope.livres.splice(index, 1); 
                           }
                         });
                           $scope.livres.splice(0, 0, $scope.complexResult);//($scope.complexResult);
           
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
livreCtrl.$inject = ['$scope', '$element', 'ModalService','rhService', 'filterFilter'];




  var  livrePopCtrl= function ($scope, $element, rhService, $location, $timeout, $q, $log, filterFilter ,title, close, livreID) {
      $scope.livre = {};
    
      $scope.id = livreID;
      $scope.Updating = true;
      $scope.CRUDresult = "";
      $scope.title = title;
  if ($scope.id) {
         rhService.getLivre($scope.id).then(
             function (results) {
                 // on success
                 $scope.livre = results.data;
             },
              function (results) {
                  $scope.CRUDresult = "Data failed to load with status : " + results.data;
                  alert(results.data);
              }
             );
    }
    $scope.categories=[];
rhService.getAllCategorie().then(
  
               function (results) {
              //     alert($scope.vehicule);
                   $scope.categories = results.data;
                   $scope.CRUDresult = "Data updated with success"
               });
rhService.getAllAuteur().then(
  
               function (results) {
      
                   $scope.auteurs = results.data;
                   $scope.CRUDresult = "Data updated with success"
               });
     $scope._type={};
        $scope.close = function () {
             $scope._type.value= $scope.livre.ecrit_par.type;
            $scope.livre.ecrit_par.type= $scope._type;
             if ($scope.id) {
                   rhService.putLivre($scope.id,$scope.livre).then(
                   function (results) {
                        $scope.CRUDresult = results.data;
                    },
                   function (results) {
                      $scope.CRUDresult = results.data;
                   });
          
             }else{
            
            
            rhService.postLivre($scope.livre).then(
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
  livrePopCtrl.$inject = ['$scope','$element', 'rhService', '$location', '$timeout', '$q', '$log', 'filterFilter', 'title', 'close', 'livreID'];
