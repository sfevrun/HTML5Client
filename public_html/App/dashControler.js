var dashCtrl = function ($scope, $element, rhService, $location, ModalService) {






    $scope.categories = [];
    rhService.getAllCategorie().then(
            function (results) {
                //     alert($scope.vehicule);
                $scope.categories = results.data;
                $scope.CRUDresult = "Data updated with success"
                $scope.livres = [];
                rhService.getAllLivre().then(
                        function (results) {

                            $scope.livres = results.data;
                            $scope.CRUDresult = "Data updated with success"
                            $scope.results = [];
                            angular.forEach($scope.categories, function (categorie) {
                                //    alert(categorie.nom);
                                $scope.result = {};
                                $scope.result.quantite = 0;
                                $scope.result.categorie = categorie.nom;
                                angular.forEach($scope.livres, function (livre) {
                                    if (livre.categorie.nom == categorie.nom) {

                                        $scope.result.quantite = $scope.result.quantite + livre.quantite;
                                        $scope.results.push($scope.result);

                                    }
                                });
                            });
                            $scope.lookups = [];
                            $scope.datas = [];
                            angular.forEach($scope.results, function (result) {

                                $scope.lookups.push(result.categorie);
                                $scope.datas.push(result.quantite);

                            });
                            $scope.charts = {
                                labels: $scope.lookups,
                                datasets: [
                                    {
                                        label: "Roman",
                                        backgroundColor: ["#FF6384", "#36A2EB", "#27C24C"],
                                        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#27C24C"],
                                        data: $scope.datas
                                    }

                                ]
                            };

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
dashCtrl.$inject = ['$scope', '$element', 'rhService', '$location', 'ModalService'];
