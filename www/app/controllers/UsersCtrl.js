app.controller('DashCtrl', function($scope, $http,$ionicModal, $ionicPopup, $stateParams,$ionicPopover) {
    var ndate = $stateParams.ndate;
    var actualDate=null;
    var dYear=2020;

    if(!ndate){
        var now = new Date();
        //actualDate = now.getFullYear() + '-' + ('0' + (now.getMonth() + 1)).slice(-2) + '-' + ('0' + now.getDate()).slice(-2);
        actualDate = dYear + '-' + ('0' + (now.getMonth() + 1)).slice(-2) + '-' + ('0' + now.getDate()).slice(-2);
    }else{
        actualDate = ndate;
    }

    //day of the year======================
    var now = new Date(actualDate);
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    //console.log('Day of year: ' + day);
    //end====================

    $http.get('seekdaily2020.json').success(function(data){
        $scope.dataSet = data;
        $scope.appDate=actualDate;
        $scope.dayNumber=day;

        //console.log('The current ISO week number is ' + $scope.weekNumber);

        /* get date from 1-365 */
        function dateFromDay(yearn, dayn){
            var date = new Date(yearn, 0);
            return new Date(date.setDate(dayn));
        }
        $scope.newDate = dateFromDay(dYear, day);

        $scope.current = $scope.dataSet[day];

        $scope.current = $scope.dataSet[$scope.dayNumber];
        $scope.next = function(){
            var i = $scope.getIndex($scope.current.id, 1);
            //console.log('New Day of year: ' + i);
            $scope.current = $scope.dataSet[i];
            $scope.newDate = dateFromDay(dYear, i);
            $scope.dayNumber=i;
        };
        $scope.previous = function(){
            var i = $scope.getIndex($scope.current.id, -1);
            //console.log('New Day of year: ' + i);
            $scope.current = $scope.dataSet[i];
            $scope.newDate = dateFromDay(dYear, i);
            $scope.dayNumber=i;
        };
        $scope.getIndex = function(currentIndex, shift){
            var len = $scope.dataSet.length;
            return (((currentIndex + shift) + len) % len)
        };

        $ionicModal.fromTemplateUrl('templates/modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });
        $scope.openModal = function(){
            $scope.modal.show();
        };
        $scope.closeModal = function(){
            $scope.modal.hide();
        };

        /*Increase/Decrease Font*/
        $scope.size = 15;
        $scope.fontSize = "font-size-" + $scope.size;

        $scope.increase = function(){
            //Higher limit
            if($scope.size < 20){
                $scope.size++;
                $scope.fontSize = "font-size-" + $scope.size;
            }
        };
        $scope.decrease = function(){
            //Lower limit
            if($scope.size > 15){
                $scope.size--;
                $scope.fontSize = "font-size-" + $scope.size;
            }
        };
    });

    $ionicPopover.fromTemplateUrl('popover.html', {
        scope: $scope
    }).then(function(popover) {
        $scope.popover = popover;
    });
    $scope.openPopover = function($event) {
        $scope.popover.show($event);
    };
    $scope.closePopover = function() {
        $scope.popover.hide();
    };
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.popover.remove();
    });
    // Execute action on hide popover
    $scope.$on('popover.hidden', function() {
        // Execute action
    });
    // Execute action on remove popover
    $scope.$on('popover.removed', function() {
        // Execute action
    });
});