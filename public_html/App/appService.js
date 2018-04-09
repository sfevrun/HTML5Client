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
         postLivre:postLivre
        
       };
}
rhService.$inject = ['$http', '$q'];

