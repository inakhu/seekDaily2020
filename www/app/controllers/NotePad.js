app.controller('TodosCtrl', function($scope, $rootScope, Todos, $localStorage, $ionicModal, $ionicPopup, $location) {

  $scope.$storage = $localStorage;
  $scope.todos = Todos.all();
  $scope.list = {};
  $ionicModal.fromTemplateUrl('add-list.html', {scope: $scope}).then(function(modal) { $scope.modal = modal; });
  $scope.openModal = function(){$scope.modal.show();};
  $scope.closeModal = function(){$scope.modal.hide();};
  $scope.$on('$destroy', function(){$scope.modal.remove();});
  $scope.colores = ['Purple','Blue', 'Green','Orange','Brown', 'Yellow'];
  $scope.add = function(list){
    if(!list.name){
      $ionicPopup.alert({
       title: 'Message Alert!',
       template: 'You must enter a name for the list'
     });
    }else{
      $scope.list.todos = new Array();
      Todos.saveList(list);
      $scope.clearList();
      $location.path('/tab/todos/'+list.id);
    }
  };
  $scope.isDone = false;
  $scope.del = function(list){
    var confirmPopup = $ionicPopup.confirm({
      title: 'Are you sure?',
       template: 'If you accept, the list with all tasks will be deleted',
       buttons: [
        {text: 'Cancel', type: 'button-default'},
        {text: 'Remove', type: 'button-calm', onTap: function(e){return true;}}
      ]
     });

     confirmPopup.then(function(res) {
       if(res) {
         Todos.removeList(list);
       } else {
         console.log('Canceled');
       }
     });
  };
  $scope.clearList = function(){
    $scope.list = {};
    $scope.closeModal();
  };
});

app.controller('TodoListCtrl', function($scope, $rootScope, $stateParams, $ionicModal, Todos, $localStorage) {
  $scope.todolist = Todos.one($stateParams.todosId);
  $scope.listid = $scope.todolist.id;
  $scope.todo = {};
  $scope.todo.done = false;
  $scope.todo.id = $rootScope.randomId();
  $ionicModal.fromTemplateUrl('add-todo.html', {scope: $scope}).then(function(modal) { $scope.modal = modal; });
  $scope.openModal = function(){$scope.modal.show();};
  $scope.closeModal = function(){$scope.modal.hide();};
  $scope.$on('$destroy', function(){$scope.modal.remove();});
  $scope.clearList = function(){
    $scope.todo = {};
    $scope.todo.done = false;
    $scope.todo.id = $rootScope.randomId();
    $scope.closeModal();

  };
  $scope.addTodo = function(id, todo){
    if(!todo.name){
      $scope.message= "A title is required";
    }else{
      Todos.saveTodo($scope.listid, todo);
      $scope.clearList();
    }
  };
  $scope.done = function(id){
    console.log(id);
    Todos.isDone(id);
  };
});

app.controller('NotesCtrl', function($scope, $rootScope, Notes, $localStorage, $ionicModal, $ionicPopup, $location) {
  $scope.$storage = $localStorage;
  $scope.notes = Notes.all();
  $scope.note = {};
  $ionicModal.fromTemplateUrl('add-note.html', {scope: $scope}).then(function(modal) { $scope.modal = modal; });
  $scope.openModal = function(){$scope.modal.show();};
  $scope.closeModal = function(){$scope.modal.hide();};
  $scope.$on('$destroy', function(){$scope.modal.remove();});
  $scope.add = function(note){
    if(!note.title){
      $ionicPopup.alert({
       title: 'Message Alert!',
       template: 'The note must have a title'
     });
    }else{
      Notes.addNote(note);
      $scope.clearList();
      $location.path('/tab/notes/'+note.id);
    }
  };
  $scope.del = function(list){
    var confirmPopup = $ionicPopup.confirm({
      title: 'Are you sure?',
       template: 'If you accept, this note will be deleted',
       buttons: [
        {text: 'Cancel', type: 'button-default'},
        {text: 'Remove', type: 'button-calm', onTap: function(e){return true;}}
      ]
     });

     confirmPopup.then(function(res) {
       if(res) {
         Notes.removeNote(list);
       } else {
         console.log('Canceled');
       }
     });
  };
  $scope.clearList = function(){
    $scope.note = {};
    $scope.closeModal();
  };
});

app.controller('NoteDetailCtrl', function($scope, $rootScope, $stateParams, $ionicModal, Notes, $localStorage, $state) {
  $scope.note = Notes.one($stateParams.noteId);
  $scope.save = function(){
    $state.go('tab.notedetail');
  }
});

app.controller('OptionsCtrl', function($scope, $rootScope, Todos, $localStorage, $ionicModal, $ionicPopup, $location) {
  $scope.resetDB = function(){
    var confirmPopup = $ionicPopup.confirm({
      title: 'Are you sure?',
       template: 'If you accept, all existing notes will be deleted',
       buttons: [
        {text: 'Cancel', type: 'button-default'},
        {text: 'Remove', type: 'button-calm', onTap: function(e){return true;}}
      ]
     });

     confirmPopup.then(function(res) {
       if(res) {
         $localStorage.$reset({
          notes: [],
          todos: []
         });
       } else {
         console.log('Canceled');
       }
     });
  };
});
