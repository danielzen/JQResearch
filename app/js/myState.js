var MyState = function() {
  this.over = false;
  this.selected = false;
}

function StateCtrl($scope) {
  $scope.myState = new MyState();
  $scope.myState.selected = true;
  $scope.states = [new MyState(), new MyState(), new MyState()];
}

angular.module("myModule", []).directive('myState', function($compile) {
  return {
    replace: true,
    scope: {
      state: 'accessor'
    },
    template: '<span>{{selected()}}{{over()}} {{state}}</span>',
    link: function(scope, element, attrs) {
      scope.selected = function() {
        return scope.state().selected ? 'S' : 's';
      };

      scope.over = function() {
        return scope.state().over ? 'O' : 'o';
      };
    }
  }
});