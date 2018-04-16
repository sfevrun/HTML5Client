var dashCtrl = function ($scope, $element, rhService, $location, ModalService) {
  
    $scope.charts = {
    labels: ["Roman", "Tragedie", "Histoire"],
    datasets: [
      {
        label: "Roman",
        backgroundColor: [ "#FF6384","#36A2EB","#27C24C"],
        hoverBackgroundColor: ["#FF6384","#36A2EB","#27C24C"],
        data: [25, 67, 54]
      }
       
    ]
  };
  
  
  var lookup = {};
angular.forEach($scope.activities, function(activity){
    lookup[activity.id] = activity;
});
  
  
  angular.forEach($scope.competitionDetails, function(user){
    user.results = {};
    angular.forEach(user.activities, function(activity){
        var name = lookup[activity.id].name;
        if(!user.results[name]){
            user.results[name] = 1;
        }else{                
            user.results[name] += 1;            
        }
    });        
});
  
  
  
 
   $scope.chartsprets = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Quantite Pret",
        backgroundColor: [
          '#FF6384)',
          ],
        borderColor: [
          '#36A2EB',
         
        ],
        borderWidth: 1,
        data: [55, 57, 54, 55, 59, 53, 56]
      }       
    ]
  };



}
dashCtrl.$inject = ['$scope', '$element', 'rhService', '$location','ModalService'];
