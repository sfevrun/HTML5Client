var loginCtrl =  function ($scope, $state, rhService) {
     $scope.signin = function() {
        
        // here, we fake authenticating and give a fake user
        rhService.authenticate({
          name: 'Test User',
          roles: ['User']
        });
        
        if ($scope.returnToState) $state.go($scope.returnToState.name, $scope.returnToStateParams);
        else $state.go('/');
      };
  } 
loginCtrl.$inject = ['$scope', '$state', 'rhService'];

