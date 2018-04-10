'use strict';
/// <reference path="C:\Users\FEVRUN\Documents\Visual Studio 2013\Projects\SGS\SGS\Views/Parametre/Rayon.cshtml" />
var app = angular.module('app', ['ui.router', 'ui.bootstrap', 'angularModalService','ngSanitize']);
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
app.factory('rhService', rhService);
var configFunction = function ($stateProvider, $httpProvider, $locationProvider, $urlRouterProvider) {

    //$locationProvider.hashPrefix('!').html5Mode(
    //    {
    //        enabled: true,
    //        requireBase: false
    //    });
      
    $stateProvider
              .state('~/', {
              url: '',
              views: {
                  "containerOne": {
                      templateUrl: 'views/categorieListe.html',
                      controller: catCtrl,
              
                  }
              }
              }).state('livreListe', {
              url: '/livreListe',
              views: {
                  "containerOne": {
                      templateUrl: 'views/livreListe.html',
                      controller: livreCtrl,
              
                  }
              }
              }).state('auteurs', {
              url: '/auteurs',
              views: {
                  "containerOne": {
                      templateUrl: 'views/auteur.html',
                      controller: auteurCtrl,
              
                  }
              }
              })
           .state('pret', {
              url: '/pret',
              views: {
                  "containerOne": {
                      templateUrl: 'views/pret.html',
                      controller: pretCtrl,
              
                  }
              }
              })
   .state('users', {
              url: '/users',
              views: {
                  "containerOne": {
                      templateUrl: 'views/user.html',
                      controller: userCtrl,
              
                  }
              }
              })
   .state('personne', {
              url: '/personne',
              views: {
                  "containerOne": {
                      templateUrl: 'views/personneListe.html',
                      controller: persCtrl,
              
                  }
              }
              })

    }


  //  $stateProvider.errorOnUnhandledRejections(false);

configFunction.$inject = ['$stateProvider', '$httpProvider', '$locationProvider', '$urlRouterProvider'];
app.config(configFunction).run(function ($rootScope) {
    $rootScope.$on('$stateChangeStart', function () {
        $rootScope.stateLoading = true;
    })

    $rootScope.$on('$stateChangeSuccess', function () {
        $rootScope.stateLoading = false;
    })
});


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


