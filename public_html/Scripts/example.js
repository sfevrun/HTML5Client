angular.module('plunker', [
  'sy.bootstrap.timepicker',
  'template/syTimepicker/timepicker.html',
  'template/syTimepicker/popup.html'
  ])
  
.controller('mainController', function($scope) {
  $scope.date = new Date();
  
  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };  
});