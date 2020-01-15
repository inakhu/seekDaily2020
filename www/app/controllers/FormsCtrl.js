app.controller('FormsCtrl', function($scope, $stateParams , HTSServices,APP_SERVER, $ionicPopup,$ionicLoading) {
    /*add*/
    $scope.data = {};
    $scope.ProcessForm = function () {
        $ionicLoading.show({template: 'processing...'});
        HTSServices.HezecomPostNewInfo('contact/api/'+APP_SERVER.apikey, $scope.data)
            .success(function (data) {
                if (data.errors) {
                    $ionicPopup.alert({
                        title: 'Information',
                        template: data.errors
                    });
                    $ionicLoading.hide();
                } else {
                    $ionicPopup.alert({
                        title: 'Success Message:',
                        template: data.message
                    });
                    $ionicLoading.hide();
                }
            });
    };
});