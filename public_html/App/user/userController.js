var userCtrl =  function ($scope, $element, ModalService, rhService, filterFilter) {

 
$scope.users=[];
rhService.getAllUser().then(
  
               function (results) {
              //     alert($scope.vehicule);
                   $scope.users = results.data;
                   $scope.CRUDresult = "Data updated with success"
               });


      $scope.showUser = function (userID) {
        ModalService.showModal({
            templateUrl: "App/user/ModalUser.html",
            controller: "userPopCtrl",
            windowClass: 'app-modal-window',
            inputs: {
                title: (userID == null) ? "Ajouter user" : " Edit user: " + userID,
                userID: userID
            }
        }).then(function (modal) {
            modal.element.modal(); // open the modal form
            modal.close.then(
              function (result) {
                  $scope.complexResult = modal.scope.CRUDresult;
                  if ($scope.complexResult.success) {
                        $scope.users.forEach(function(v) {
                            if(v.id == $scope.complexResult.id) {//v.reply_content = 'dddddd';
                             var index = $scope.users.indexOf(v);
                               $scope.users.splice(index, 1); 
                           }
                         });
                      $scope.users.splice(0, 0, $scope.complexResult);//($scope.complexResult);
               
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
userCtrl.$inject = ['$scope', '$element', 'ModalService','rhService', 'filterFilter'];




  var  userPopCtrl= function ($scope, $element, rhService, $location, $timeout, $q, $log, filterFilter ,title, close, userID) {
      $scope.user = {};
    
      $scope.id = userID;
      $scope.Updating = true;
      $scope.CRUDresult = "";
      $scope.title = title;
  if ($scope.id) {
         rhService.getUser($scope.id).then(
             function (results) {
                 // on success
                 $scope.user = results.data;
             },
              function (results) {
                  $scope.CRUDresult = "Data failed to load with status : " + results.data;
                  alert(results.data);
              }
             );
    }
    
        $scope.close = function () {
            rhService.postUser($scope.user).then(
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
  userPopCtrl.$inject = ['$scope','$element', 'rhService', '$location', '$timeout', '$q', '$log', 'filterFilter', 'title', 'close', 'userID'];
