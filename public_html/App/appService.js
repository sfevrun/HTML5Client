var rhService = function ($http, $q) {
    $http.defaults.useXDomain = true;
    var deferredObject = $q.defer();

        var getAllCategorie = function () {
        return $http.get("http://127.0.0.1:8080/bibliotheque_ntdp/webresources/categorie");
        };

       var getCategorie= function (id) {
        return $http.get("http://127.0.0.1:8080/bibliotheque_ntdp/webresources/categorie/"+id);
        };

   var postCategorie = function (newCategorie) {
       return $http.post("http://127.0.0.1:8080/bibliotheque_ntdp/webresources/categorie",JSON.stringify(newCategorie));
   };

  var putCategorie = function (id,newCategorie) {
       return $http.put("http://127.0.0.1:8080/bibliotheque_ntdp/webresources/categorie/"+id,JSON.stringify(newCategorie));
   };




   var getAllPersonne = function () {
        return $http.get("http://127.0.0.1:8080/bibliotheque_ntdp/webresources/personne");
        };

       var getPersonne= function (id) {
        return $http.get("http://127.0.0.1:8080/bibliotheque_ntdp/webresources/personne/"+id);
        };

   var postPersonne = function (newPersonne) {
       return $http.post("http://127.0.0.1:8080/bibliotheque_ntdp/webresources/personne",JSON.stringify(newPersonne));
   };
   var putPersonne= function (id,newCategorie) {
       return $http.put("http://127.0.0.1:8080/bibliotheque_ntdp/webresources/personne/"+id,JSON.stringify(newCategorie));
   };

/////////////////////////////////////////////////////////////////////////////////
 var getAllLivre = function () {
        return $http.get("http://127.0.0.1:8080/bibliotheque_ntdp/webresources/livre");
        };

       var getLivre= function (id) {
        return $http.get("http://127.0.0.1:8080/bibliotheque_ntdp/webresources/livre/"+id);
        };

   var postLivre = function (newPersonne) {
       return $http.post("http://127.0.0.1:8080/bibliotheque_ntdp/webresources/livre",JSON.stringify(newPersonne));
   };
     var putLivre = function (id,newCategorie) {
       return $http.put("http://127.0.0.1:8080/bibliotheque_ntdp/webresources/livre/"+id,JSON.stringify(newCategorie));
   };

   
    var getAllPret= function () {
        return $http.get("http://127.0.0.1:8080/bibliotheque_ntdp/webresources/pret");
        };

       var getPret= function (id) {
        return $http.get("http://127.0.0.1:8080/bibliotheque_ntdp/webresources/pret/"+id);
        };

   var postPret = function (newPersonne) {
       return $http.post("http://127.0.0.1:8080/bibliotheque_ntdp/webresources/pret",JSON.stringify(newPersonne));
   };
     var putPret = function (id,newCategorie) {
       return $http.put("http://127.0.0.1:8080/bibliotheque_ntdp/webresources/pret/"+id,JSON.stringify(newCategorie));
   };

   
    var getAllAuteur = function () {
        return $http.get("http://127.0.0.1:8080/bibliotheque_ntdp/webresources/auteur");
        };

       var getAuteur= function (id) {
        return $http.get("http://127.0.0.1:8080/bibliotheque_ntdp/webresources/auteur/"+id);
        };


   
   var postAuteur = function (newPersonne) {
       return $http.post("http://127.0.0.1:8080/bibliotheque_ntdp/webresources/auteur",JSON.stringify(newPersonne));
   };
     var putAuteur = function (id,newCategorie) {
       return $http.put("http://127.0.0.1:8080/bibliotheque_ntdp/webresources/auteur/"+id,JSON.stringify(newCategorie));
   };

   //////////////////////////////////////
      var getAllUser = function () {
        return $http.get("http://127.0.0.1:8080/bibliotheque_ntdp/webresources/users");
        };

       var getUser= function (id) {
        return $http.get("http://127.0.0.1:8080/bibliotheque_ntdp/webresources/users/"+id);
        };

   var postUser = function (newPersonne) {
       return $http.post("http://127.0.0.1:8080/bibliotheque_ntdp/webresources/users",JSON.stringify(newPersonne));
   };
     var putUser = function (id,newCategorie) {
       return $http.put("http://127.0.0.1:8080/bibliotheque_ntdp/webresources/users/"+id,JSON.stringify(newCategorie));
   };

   var _identity = undefined,
      _authenticated = false;
     ////////////////////////////////////////////////////////////////////
      var onLoad = function(reader, deferred, scope) {
    return function() {
      scope.$apply(function() {
        deferred.resolve(reader.result);
      });
    };
  };

  var onError = function(reader, deferred, scope) {
    return function() {
      scope.$apply(function() {
        deferred.reject(reader.result);
      });
    };
  };

  var onProgress = function(reader, scope) {
    return function(event) {
      scope.$broadcast("fileProgress", {
        total: event.total,
        loaded: event.loaded
      });
    };
  };

  var getReader = function(deferred, scope) {
    var reader = new FileReader();
    reader.onload = onLoad(reader, deferred, scope);
    reader.onerror = onError(reader, deferred, scope);
    reader.onprogress = onProgress(reader, scope);
    return reader;
  };

  var readAsDataURL = function(file, scope) {
    var deferred = $q.defer();

    var reader = getReader(deferred, scope);
    reader.readAsDataURL(file);

    return deferred.promise;
  };
  /////////////////////////////////////////
     return {
         getAllCategorie:getAllCategorie,
         getCategorie:getCategorie,
         postCategorie:postCategorie,
         getAllPersonne:getAllPersonne,
         getPersonne:getPersonne,
         postPersonne:postPersonne,
         /////////////
          getAllLivre:getAllLivre,
         getLivre:getLivre,
         postLivre:postLivre,
         //////////////////////
           getAllAuteur:getAllAuteur,
         getAuteur:getAuteur,
         postAuteur:postAuteur,
            //////////////////////
           getAllPret:getAllPret,
         getPret:getPret,
         postPret:postPret,
              //////////////////////
           getAllUser:getAllUser,
         getUser:getUser,
         postUser:postUser,
         putCategorie:putCategorie,
         putLivre:putLivre,
         putUser:putUser,
         putAuteur:putAuteur,
         putPersonne:putPersonne,
          readAsDataUrl: readAsDataURL,
        isIdentityResolved: function() {
        return angular.isDefined(_identity);
      },
      isAuthenticated: function() {
        return _authenticated;
      },
      isInRole: function(role) {
        if (!_authenticated || !_identity.roles) return false;

        return _identity.roles.indexOf(role) != -1;
      },
      isInAnyRole: function(roles) {
        if (!_authenticated || !_identity.roles) return false;

        for (var i = 0; i < roles.length; i++) {
          if (this.isInRole(roles[i])) return true;
        }

        return false;
      },
      authenticate: function(identity) {
        _identity = identity;
        _authenticated = identity != null;
        
        // for this demo, we'll store the identity in localStorage. For you, it could be a cookie, sessionStorage, whatever
        if (identity) localStorage.setItem("app.identity", angular.toJson(identity));
        else localStorage.removeItem("app.identity");
      },
      identity: function(force) {
        var deferred = $q.defer();

        if (force === true) _identity = undefined;

        // check and see if we have retrieved the identity data from the server. if we have, reuse it by immediately resolving
        if (angular.isDefined(_identity)) {
          deferred.resolve(_identity);

          return deferred.promise;
        }

        // otherwise, retrieve the identity data from the server, update the identity object, and then resolve.
        //                   $http.get('/svc/account/identity', { ignoreErrors: true })
        //                        .success(function(data) {
        //                            _identity = data;
        //                            _authenticated = true;
        //                            deferred.resolve(_identity);
        //                        })
        //                        .error(function () {
        //                            _identity = null;
        //                            _authenticated = false;
        //                            deferred.resolve(_identity);
        //                        });

        // for the sake of the demo, we'll attempt to read the identity from localStorage. the example above might be a way if you use cookies or need to retrieve the latest identity from an api
        // i put it in a timeout to illustrate deferred resolution
        var self = this;
        $timeout(function() {
          _identity = angular.fromJson(localStorage.getItem("app.identity"));
          self.authenticate(_identity);
          deferred.resolve(_identity);
        }, 1000);

        return deferred.promise;
      }
       };
}
rhService.$inject = ['$http', '$q'];

