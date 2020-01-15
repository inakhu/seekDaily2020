
app.controller('DefaultCtrl', function() {

});

app.controller('NewsCtrl', function($scope ,$state, HTSServices, $ionicFilterBar,$ionicLoading,$ionicPopup,APP_SERVER) {

    $scope.surl=APP_SERVER.url+'templates/uploads/main/';

    $scope.HTSappLoader = function() {
        $ionicLoading.show({template: 'Loading...'});
        HTSServices.HezecomGetOne('news/api/'+APP_SERVER.apikey).success(function (data) {
            $scope.news = data.data;
            $scope.totalItems = data.count;
            $ionicLoading.hide();
        });

    };
    $scope.HTSappLoader();

    $scope.PullRefresher= function()
    {
        $scope.HTSappLoader();
        $scope.$broadcast('scroll.refreshComplete');
    };
});

app.controller('NewsDetails', function($scope, $stateParams , HTSServices,$ionicLoading,StorageService,APP_SERVER) {
    var id = $stateParams.id;
    $scope.row = {};
    $scope.mainurl=APP_SERVER.url;
    $scope.surl=APP_SERVER.url+'templates/uploads/main/';
    /*Increase/Decrease Font*/
    $scope.size = 15;
    $scope.fontSize = "font-size-"+$scope.size;
    $scope.DetailsLoader = function(id) {
        $ionicLoading.show({template: 'Loading...'});
        HTSServices.HezecomGetOne('/news/api/news/' + id+'/'+APP_SERVER.apikey).success(function (data) {
            $scope.row = data.data;
            $scope.advert = data.Advert;
            $scope.main_message = data.main_message;
        });
        $ionicLoading.hide();
    };
    $scope.DetailsLoader(id);

    $scope.PullRefresher= function(id)
    {
        $scope.DetailsLoader(id);
        $scope.$broadcast('scroll.refreshComplete');
    };

});
