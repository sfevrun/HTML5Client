'use strict';
/// <reference path="C:\Users\FEVRUN\Documents\Visual Studio 2013\Projects\SGS\SGS\Views/Parametre/Rayon.cshtml" />
var app = angular.module('app', ['ui.router', 'ui.bootstrap', 'angularModalService','ngSanitize', 'ui.bootstrap.datetimepicker']);
app.controller('catCtrl', catCtrl);
app.controller('catPopCtrl', catPopCtrl);
app.controller('persCtrl', persCtrl);
app.controller('persPopCtrl', persPopCtrl);
app.controller('livreCtrl', livreCtrl);
app.controller('livrePopCtrl', livrePopCtrl);
app.controller('auteurCtrl', auteurCtrl);
app.controller('auteurPopCtrl', auteurPopCtrl);
app.controller('userCtrl', userCtrl);
app.controller('userPopCtrl', userPopCtrl);
app.controller('pretCtrl', pretCtrl);
app.controller('pretPopCtrl', pretPopCtrl);

//app.factory('principal', principal);
app.factory('authorization', authorization);

app.factory('rhService', rhService);
app.controller('loginCtrl', loginCtrl);

var configFunction = function ($stateProvider, $httpProvider, $locationProvider, $urlRouterProvider) {

    //$locationProvider.hashPrefix('!').html5Mode(
    //    {
    //        enabled: true,
    //        requireBase: false
    //    });
      
   $urlRouterProvider.otherwise('/signin');

      $stateProvider.state('site', {
        'abstract': true,
        resolve: {
          authorize: ['authorization',
            function(authorization) {
              return authorization.authorize();
            }
          ]
        }
      }).state('categorie', {
             parent: 'site',
              url: '/categorie',
                data: {
                   roles: ['User']
                 },
              views: {
                 'content@':  {
                      templateUrl: 'views/categorieListe.html',
                      controller: catCtrl,
              
                  }
              }
              }).state('livreListe', {
               parent: 'site',
              url: '/livreListe',
               data: {
                    roles: ['User']
                  },
              views: {
                   'content@':  {
                      templateUrl: 'views/livreListe.html',
                      controller: livreCtrl,
              
                  }
              }
              }).state('auteurs', {
                    parent: 'site',
              url: '/auteurs',
                data: {
                   roles: ['User']
                 },
              views: {
                   'content@': {
                      templateUrl: 'views/auteur.html',
                      controller: auteurCtrl,
              
                  }
              }
              })
           .state('pret', {
                 parent: 'site',
              url: '/pret',
              data: {
          roles: ['Admin']
        },
              views: {
                   'content@':  {
                      templateUrl: 'views/pret.html',
                      controller: pretCtrl,
              
                  }
              }
              })
   .state('users', {
         parent: 'site',
              url: '/users',
              views: {
                    'content@':  {
                      templateUrl: 'views/user.html',
                      controller: userCtrl,
              
                  }
              }
              })
   .state('personne', {
         parent: 'site',
              url: '/personne',
              views: {
                   'content@':  {
                      templateUrl: 'views/personneListe.html',
                      controller: persCtrl,
              
                  }
              }
              })
      .state('signin', {
     
        url: '/signin',
         data: {
          roles: []
        },
        views: {
         'content@':  {
            templateUrl: 'views/login.html',
            controller: 'loginCtrl'
          }
        }
      }).state('accessdenied', {
        parent: 'site',
        url: '/denied',
        data: {
          roles: []
        },
        views: {
          'content@': {
            templateUrl: 'views/denied.html'
          }
        }
      })

    }


  //  $stateProvider.errorOnUnhandledRejections(false);

configFunction.$inject = ['$stateProvider', '$httpProvider', '$locationProvider', '$urlRouterProvider'];
app.config(configFunction).run(['$rootScope', '$state', '$stateParams', 'authorization', 'rhService'
    ,function ($rootScope, $state, $stateParams, authorization, rhService) {
     $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
        $rootScope.toState = toState;
        $rootScope.toStateParams = toStateParams; 
        //    alert(JSON.stringify(rhService.isIdentityResolved()));
        if (rhService.isIdentityResolved())
        {
         //   alert(JSON.stringify(toState.name));
            authorization.authorize();
        }
      
    
      });
}]);


/*
  .run(['$rootScope', '$state', '$stateParams', 'authorization', 'rhService',
    function($rootScope, $state, $stateParams, authorization, rhService) {
      $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
        $rootScope.toState = toState;
        $rootScope.toStateParams = toStateParams;

        if (principal.isIdentityResolved()) authorization.authorize();
      });
    }
*/



app.directive('ngConfirmClick', [
        function () {
            return {
                link: function (scope, element, attr) {
                    var msg = attr.ngConfirmClick || "Are you sure?";
                    var clickAction = attr.confirmedClick;
                    element.bind('click', function (event) {
                        if (window.confirm(msg)) {
                            scope.$eval(clickAction)
                        }
                    });
                }
            };
        }])

//n my project, root state is login state if login successfully then it goes to admin.dashboard state, where admin state was abstract state.

//i user $state.transitionTo instead of $state.go when go to admin.dashboard state.

//also add on app.config section.

//$qProvider.errorOnUnhandledRejections(false);

//that's work for me.


    //app.directive('fileModel', ['$parse', function ($parse) {
    //    return {
    //        restrict: 'A',
    //        link: function (scope, element, attrs) {
    //            var model = $parse(attrs.fileModel);
    //            var modelSetter = model.assign;

    //            element.bind('change', function () {
    //                scope.$apply(function () {
    //                    modelSetter(scope, element[0].files[0]);
    //                });
    //            });
    //        }
    //    };
    //}]);


