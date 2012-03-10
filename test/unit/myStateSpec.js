'use strict';

describe('widgets', function () {
  var element;

  beforeEach(module('myModule'));

  it('myState', inject(function ($rootScope, $compile) {
    element = $compile('<my:state state="myState"></my:state>')($rootScope);
    $rootScope.myState = {over:false, selected: true};
    $rootScope.$apply();
    console.log(element);
    expect(element.text().trim()).toBe("So");
  }));

});
