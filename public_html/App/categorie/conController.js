var catCtrl =  function ($scope, $element, ModalService, rhService, filterFilter) {
$scope.signout = function() {
        rhService.authenticate(null);
        $state.go('login');
      };
 //alert('Categorie');
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
              //    alert(JSON.stringify(result));
                  $scope.complexResult = modal.scope.CRUDresult;
                  if ($scope.complexResult) {
                    
                    $scope.categories.forEach(function(v) {
                            if(v.id == $scope.complexResult.id) {//v.reply_content = 'dddddd';
                             var index = $scope.categories.indexOf(v);
                               $scope.categories.splice(index, 1); 
                           }
                         });
                    
                   $scope.categories.splice(0, 0, $scope.complexResult);//($scope.complexResult);
               
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
   //   $scope.Updating = true;
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
             if ($scope.id) {
                   rhService.putCategorie($scope.id,$scope.categorie).then(
                   function (results) {
                        $scope.CRUDresult = results.data;
                    },
                   function (results) {
                      $scope.CRUDresult = results.data;
                   });
          
             }else{
            rhService.postCategorie($scope.categorie).then(
                   function (results) {
                      // on success
                 
                       $scope.CRUDresult = results.data;
                     //   alert(JSON.stringify(results.data));
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
  catPopCtrl.$inject = ['$scope','$element', 'rhService', '$location', '$timeout', '$q', '$log', 'filterFilter', 'title', 'close', 'categorieID'];
