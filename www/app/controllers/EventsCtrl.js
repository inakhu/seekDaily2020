
app.controller('EventsCtrl', function($scope, $stateParams , HTSServices,APP_SERVER, $ionicPopup, $ionicLoading,$state) {
    //view
    $scope.surl=APP_SERVER.url+'templates/uploads/main/';
    $scope.HTSappLoader = function() {
        $ionicLoading.show({template: 'Loading...'});
        HTSServices.HezecomGetOne('appnews/api/news/'+APP_SERVER.apikey).success(function (data) {
            $scope.news = data.data;
            $scope.totalItems = data.count;
            $scope.featured = data.featured;
            $scope.advert = data.Advert;
            $ionicLoading.hide();
        });
    };
    $scope.PullRefresher= function()
    {
        $scope.HTSappLoader();
        $scope.$broadcast('scroll.refreshComplete');
    };
    $scope.HTSappLoader();

});

app.controller('EventsDetails', function($scope, $stateParams , HTSServices,VideoControl,$ionicLoading,StorageService,APP_SERVER) {
    var id = $stateParams.id;

    $scope.row = {};
    $scope.mainurl=APP_SERVER.url;
    $scope.surl=APP_SERVER.url+'templates/uploads/main/';
    /*Increase/Decrease Font*/
    $scope.size = 16;
    $scope.fontSize = "font-size-"+$scope.size;

    $scope.DetailsLoader = function(id) {
        $ionicLoading.show({template: 'Loading...'});
        HTSServices.HezecomGetOne('/iwitness/api/' + id+'/'+APP_SERVER.apikey).success(function (data) {
            $scope.row = data.data;
            $scope.vlink = data.vlink;
            $scope.advert = data.Advert;
        });
        $ionicLoading.hide();
    };
    $scope.DetailsLoader(id);

    $scope.PullRefresher= function(id)
    {
        $scope.DetailsLoader(id);
        $scope.$broadcast('scroll.refreshComplete');
    };

    $scope.$on(VideoControl.events.onPause, function (event) {
        var iframe = document.getElementsByTagName("iframe")[0].contentWindow;
        iframe.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
        player = new YT.Player('player-controls', {
            playerVars: { 'showinfo': 0, 'rel': 0, 'controls': 1 },
            width: '100%',
            videoId: "rkUgoaco1Ac",
            events: {
                'onStateChange': onYouTubePlayerStateChange
            }
        });
        w.addEventListener('pause', triggerPause, false);
        function triggerPause () {
            player.stopVideo();
        }
    });

});
