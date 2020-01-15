/*Ionic Starter App*/
angular.module('HezecomApp',[
    'ionic',
    'ngStorage',
    'jett.ionic.filter.bar',
    'ionic-modal-select',
    'ion-datetime-picker',
    'ion-floating-menu',
    'yaru22.angular-timeago',
    'htsApp.controllers',
    'htsApp.services',
    'htsApp.constants'
])

    .run(function($ionicPlatform, $rootScope, $localStorage) {

        if($localStorage.todos){
            console.log('everything exists in localStorage');
        }
        else if(!$localStorage.todos){
            console.log('there is not everything in localStorage we will create it');
            $localStorage.todos = [];
        }
        else{
            console.log('None of the above');
        }
        if($localStorage.notes){
            console.log('exists notes in localStorage');
        }
        else if(!$localStorage.notes){
            console.log('there are no notes in localStorage we will create it');
            $localStorage.notes = [];
        }
        else{
            console.log('None of the above');
        }
        $rootScope.getDateTime = function() {
            var now     = new Date();
            var year    = now.getFullYear();
            var month   = now.getMonth()+1;
            var day     = now.getDate();
            var hour    = now.getHours();
            var minute  = now.getMinutes();
            var second  = now.getSeconds();
            if(month.toString().length == 1) {var month = '0'+month;}
            if(day.toString().length == 1) {var day = '0'+day;}
            if(hour.toString().length == 1) {var hour = '0'+hour;}
            if(minute.toString().length == 1) {var minute = '0'+minute;}
            if(second.toString().length == 1) {var second = '0'+second;}
            var ampm = hour >= 12 ? 'PM' : 'AM';
            var dateTime = day+'/'+month+'/'+year+' '+hour+':'+minute+':'+second + ' ' + ampm;
            return dateTime;
        };
        $rootScope.randomId = function(){
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for( var i=0; i < 5; i++ )
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            return text;
        }
    })
    .config(function ($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist(['self', new RegExp('^(http?):\/\/(w{3}.)?baptist\.hezecom\.com/.+$')]);
    })

    .filter('validUrl', function ($sce) {
        return function(url) {
            return $sce.trustAsResourceUrl(url);
        };
    })
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url: '/app',
                abstract: true,
                cache: false,
                templateUrl: 'app/templates/others/menu.html'
            })

            .state('app.dashboard', {
                url: '/dashboard',
                views: {
                    'menuContent': {
                        templateUrl: 'app/templates/others/dashboard2.html',
                        controller: 'DashCtrl'
                    }
                }
            })
            .state('app.dashboard2', {
                url: '/dashboard/:ndate',
                views: {
                    'menuContent': {
                        templateUrl: 'app/templates/others/dashboard.html',
                        controller: 'DashCtrl'
                    }
                }
            })
            .state('app.aboutus', {
                url: '/aboutus',
                views: {
                    'menuContent': {
                        templateUrl: 'app/templates/others/aboutus.html'
                    }
                }
            })
            .state('app.contactus', {
                url: '/contactus',
                views: {
                    'menuContent': {
                        templateUrl: 'app/templates/others/contactus.html'
                    }
                }
            })
            //Build App
            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'tabs.html'
            })
            .state('tab.todos', {
                url: '/todos',
                views: {
                    'tab-todos': {
                        templateUrl: 'tab-todos.html',
                        controller: 'TodosCtrl'
                    }
                }
            })
            .state('tab.todolist', {
                url: '/todos/:todosId',
                views: {
                    'tab-todos': {
                        templateUrl: 'todo-list.html',
                        controller: 'TodoListCtrl'
                    }
                }
            })
            .state('tab.notes', {
                url: '/notes',
                views: {
                    'tab-notes': {
                        templateUrl: 'tab-notes.html',
                        controller: 'NotesCtrl'
                    }
                }
            })
            .state('tab.notedetail', {
                url: '/notes/:noteId',
                views: {
                    'tab-notes': {
                        templateUrl: 'note-detail.html',
                        controller: 'NoteDetailCtrl'
                    }
                }
            })
            .state('tab.options', {
                url: '/options',
                views: {
                    'tab-options': {
                        templateUrl: 'tab-options.html',
                        controller: 'OptionsCtrl'
                    }
                }
            })
            /*NEWS*/
            .state('app.news', {
                url: '/news',
                views: {
                    'menuContent': {
                        templateUrl: 'app/templates/news/headlines.html',
                        controller: 'NewsCtrl'
                    }
                },
                authStatus: false
            })
            .state('app.newsdetails', {
                url: '/news/:id',
                views: {
                    'menuContent': {
                        templateUrl: 'app/templates/news/news-details.html',
                        controller: 'NewsDetails'
                    }
                },
                authStatus: false
            })
            .state('app.appointment', {
                url: '/appointment/add/new',
                views: {
                    'menuContent': {
                        templateUrl: 'app/templates/forms/Add.html',
                        controller: 'FormsCtrl'
                    }
                },
                authStatus: false
            })
            .state('app.prayer', {
                url: '/prayer/add/new',
                views: {
                    'menuContent': {
                        templateUrl: 'app/templates/forms/Add2.html',
                        controller: 'FormsCtrl'
                    }
                },
                authStatus: false
            })
            .state('app.events', {
                url: '/events',
                views: {
                    'menuContent': {
                        templateUrl: 'app/templates/events/View.html',
                        controller: 'EventsCtrl'
                    }
                },
                authStatus: false
            })
            .state('app.eventsDetails', {
                url: '/events/:id',
                views: {
                    'menuContent': {
                        templateUrl: 'app/templates/events/Details.html',
                        controller: 'EventsDetails'
                    }
                },
                authStatus: false
            });
        $urlRouterProvider.otherwise('/app/dashboard');
    });
