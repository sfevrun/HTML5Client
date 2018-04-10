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



   var getAllPersonne = function () {
        return $http.get("http://127.0.0.1:8080/bibliotheque_ntdp/webresources/personne");
        };

       var getPersonne= function (id) {
        return $http.get("http://127.0.0.1:8080/bibliotheque_ntdp/webresources/personne/"+id);
        };

   var postPersonne = function (newPersonne) {
       return $http.post("http://127.0.0.1:8080/bibliotheque_ntdp/webresources/personne",JSON.stringify(newPersonne));
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
   
   
    var getAllPret= function () {
        return $http.get("http://127.0.0.1:8080/bibliotheque_ntdp/webresources/pret");
        };

       var getPret= function (id) {
        return $http.get("http://127.0.0.1:8080/bibliotheque_ntdp/webresources/pret/"+id);
        };

   var postPret = function (newPersonne) {
       return $http.post("http://127.0.0.1:8080/bibliotheque_ntdp/webresources/pret",JSON.stringify(newPersonne));
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
     ////////////////////////////////////////////////////////////////////
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
         postUser:postUser
       };
}
rhService.$inject = ['$http', '$q'];

