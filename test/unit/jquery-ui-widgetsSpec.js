/* jasmine specs for widgets go here */

describe('directives', function(){
  var scope, element;

  beforeEach(function(){
    module('jquiModule');

    this.addMatchers({
      toHaveClass: function(className) {
        var element = this.actual;
        var outter = $('<div>');
        outter.append(element.clone());
        this.actual = outter.html();
        return element.hasClass(className);
      }
    });

  });

  afterEach(function () {
    scope = element = null;
  });

  function initScopeAndCtrl($rootScope, $controller) {
    scope = $rootScope.$new();
    var controller = function ($scope) {
      $scope.start = jasmine.createSpy('start');
      $scope.end = jasmine.createSpy('end');
      $scope.accept = jasmine.createSpy('accept');
      $scope.commit = jasmine.createSpy('commit');
    };
    var ctrl = $controller(controller, {$scope:scope});
    scope.$watch(
      function () {
        scope.evalCount = scope.evalCount + 1;
      });
  }

  describe('jqui-drag-start', function () {

    it('should call drag-start; hold on to token; call drag-stop; destroy token',
      inject(function ($rootScope, $compile, $controller) {
        initScopeAndCtrl($rootScope, $controller);
        element = $compile('<div jqui-drag-start="start()" jqui-drag-end="end($token)">')(scope);
        scope.start.andReturn('TOKEN');
        element.draggable("option", 'start')();
        expect(element.draggable("option", 'revertDuration')).toBe(200);

        expect(scope.start).toHaveBeenCalled();
        expect(scope.end).not.toHaveBeenCalled();
        expect(element.data('jqui-dnd-item-token')).toEqual('TOKEN');
        expect(element).toHaveClass('jqui-dnd-item-dragging');

        element.draggable("option", 'stop')();

        expect(scope.end).toHaveBeenCalledWith('TOKEN');
        expect(element.data('jqui-dnd-item-token')).toEqual(undefined);
        expect(element).not.toHaveClass('jqui-dnd-item-dragging');
      }));
  });

  describe('jqui-drop-commit', function(){
    var ui;

    function initScopeCtrlUiAndCompile(rootScope, controller, compile) {
      initScopeAndCtrl(rootScope, controller);
      ui = {
        draggable: (function createDraggableItemInDraggingState(){
          var element =
            compile('<div jqui-drag-start="start()" jqui-drag-end="end($token)">')(scope);
          scope.start.andReturn('TOKEN');
          element.draggable('option', 'start')();
          return element;
        })()
      };

      element =
        compile('<div jqui-drop-commit="commit($token)" jqui-drop-accept="accept($token)">')(scope);
      scope.evalCount = 0;
    }

    it('should accept dragging when active', inject(function ($rootScope, $compile, $controller) {
      initScopeCtrlUiAndCompile($rootScope, $controller, $compile);
      element = $compile('<div jqui-drop-commit="commit($token)">')(scope);
      element.addClass('jqui-dnd-target-active');
      element.droppable("option", "drop")(event, ui);
      expect(scope.commit).toHaveBeenCalledWith("TOKEN");
      expect(scope.end).toHaveBeenCalledWith("TOKEN");
      expect(scope.evalCount).toEqual(1);
    }));

    it('should not accept dragging when not active', inject(function ($rootScope, $compile, $controller) {
      initScopeCtrlUiAndCompile($rootScope, $controller, $compile);
      element.droppable("option", "drop")(event, ui);
      expect(scope.commit).not.toHaveBeenCalled();
    }));

    it('should not activate', inject(function ($rootScope, $compile, $controller) {
      initScopeCtrlUiAndCompile($rootScope, $controller, $compile);
      scope.accept.andReturn(false);
      element.droppable("option", "activate")(event, ui);
      expect(scope.accept).toHaveBeenCalledWith("TOKEN");
      expect(element).toHaveClass('jqui-dnd-target-disable');
      expect(element).not.toHaveClass('jqui-dnd-target-active');
      expect(scope.evalCount).toEqual(1);
    }));

    it('should activate', inject(function ($rootScope, $compile, $controller) {
      initScopeCtrlUiAndCompile($rootScope, $controller, $compile);
      scope.accept.andReturn(true);
      element.droppable("option", "activate")(event, ui);
      expect(scope.accept).toHaveBeenCalledWith("TOKEN");
      expect(element).not.toHaveClass('jqui-dnd-target-disable');
      expect(element).toHaveClass('jqui-dnd-target-active');
      expect(scope.evalCount).toEqual(1);
    }));

    it('should change over/out CSS when active', inject(function ($rootScope, $compile, $controller) {
      initScopeCtrlUiAndCompile($rootScope, $controller, $compile);
      scope.accept.andReturn(true);
      element.droppable("option", "activate")(event, ui);

      element.droppable("option", "over")(event, ui);
      expect(element).toHaveClass('jqui-dnd-target-over');
      expect(ui.draggable).toHaveClass('jqui-dnd-item-over');

      element.droppable("option", "out")(event, ui);
      expect(element).not.toHaveClass('jqui-dnd-target-over');
      expect(ui.draggable).not.toHaveClass('jqui-dnd-item-over');
    }));

    it('should not change over/out CSS when not active', inject(function ($rootScope, $compile, $controller) {
      initScopeCtrlUiAndCompile($rootScope, $controller, $compile);
      scope.accept.andReturn(false);
      element.droppable("option", "activate")(event, ui);

      element.droppable("option", "over")(event, ui);
      expect(element).not.toHaveClass('jqui-dnd-target-over');
      expect(ui.draggable).not.toHaveClass('jqui-dnd-item-over');
    }));

    it('should commit item', inject(function ($rootScope, $compile, $controller) {
      initScopeCtrlUiAndCompile($rootScope, $controller, $compile);
      element.addClass('jqui-dnd-target-active');
      element.addClass('jqui-dnd-target-disable');
      element.addClass('jqui-dnd-target-over');

      element.droppable("option", "drop")(event, ui);

      expect(scope.commit).toHaveBeenCalledWith("TOKEN");
      expect(scope.end).toHaveBeenCalledWith("TOKEN");
      expect(element).not.toHaveClass('jqui-dnd-target-active');
      expect(element).not.toHaveClass('jqui-dnd-target-disable');
      expect(element).not.toHaveClass('jqui-dnd-target-over');
      expect(scope.evalCount).toEqual(1);
    }));
  });
});
