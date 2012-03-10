'use strict';

describe('widget', function() {
  var element;

  afterEach(function(){
//    dealoc(element);
  });

  describe('ng:switch', function() {
    it('should switch on value change', inject(function($rootScope, $compile) {
      element = $compile(
        '<div ng-switch="select">' +
          '<div ng:switch-when="1">first:{{name}}</div>' +
          '<div ng:switch-when="2">second:{{name}}</div>' +
          '<div ng:switch-when="true">true:{{name}}</div>' +
          '</div>')($rootScope);
      console.log($rootScope);
      expect(element.html()).toEqual(
        '<!-- ngSwitchWhen: 1 --><!-- ngSwitchWhen: 2 --><!-- ngSwitchWhen: true -->');
      $rootScope.select = 1;
      $rootScope.$apply();
      expect(element.text()).toEqual('first:');
      $rootScope.name="shyam";
      $rootScope.$apply();
      expect(element.text()).toEqual('first:shyam');
      $rootScope.select = 2;
      $rootScope.$apply();
      expect(element.text()).toEqual('second:shyam');
      $rootScope.name = 'misko';
      $rootScope.$apply();
      expect(element.text()).toEqual('second:misko');
      $rootScope.select = true;
      $rootScope.$apply();
      expect(element.text()).toEqual('true:misko');
    }));

  });
});
