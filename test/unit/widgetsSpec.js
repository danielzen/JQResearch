'use strict';

describe('widgets', function () {
  var element, url, name;

  beforeEach(function () {
    module('clickbooq');
    element = null;
    url = 'http://example.com/pic';
    name = "picName";
  });

  function compileAndPutPicInScope(pic, scope, compile) {
    element = compile('<li cb:picture="pic" index="1"></li>')(scope);
    putPicInScope(pic, scope);
  }

  function putPicInScope(pic, scope) {
    scope.position = 4;
    scope.pic = pic;
    scope.$apply();
  }

  it('cb:picture', inject(function ($rootScope, $compile) {
    compileAndPutPicInScope({url:url, name:name}, $rootScope, $compile);
    expect(element.find("img").attr("src")).toBe(url);
    expect(element.find("img").attr("alt")).toBe(name);
    expect(element.text()).toBe('4');
    expect(element.find(".selected").css("visibility")).toBe("hidden");
    expect(element.find(".picture-menu").css("visibility")).toBe("hidden")
  }));

  it('should have selected div visible if selected', inject(function ($rootScope, $compile) {
    compileAndPutPicInScope({url:url, name:name, selected:true}, $rootScope, $compile);
    console.log(element);
    expect(element.find(".picture-menu").css("visibility")).toBe("hidden")
    expect(element.find(".selected").css("visibility")).toBe("visible")
  }));

  it('should have picture-menu div & selected div visible if over', inject(function ($rootScope, $compile) {
    compileAndPutPicInScope({url:url, name:name, selected:false, over:true}, $rootScope, $compile);
    expect(element.find(".picture-menu").css("visibility")).toBe("visible");
    expect(element.find(".selected").css("visibility")).toBe("visible");
  }));

  it('should react to a modification?', inject(function ($rootScope, $compile) {
//    expect('pending').toEqual('completed')
    compileAndPutPicInScope({url:url, name:name, selected:false, over:false}, $rootScope, $compile);
    expect(element.find(".selected").css("visibility")).toBe("hidden");
    putPicInScope({url:url, name:name, selected:true, over:true}, $rootScope);
    expect(element.find(".selected").css("visibility")).toBe("visible")
  }));

});

//function compile(html) {
//  scope.$apply("$index=0");
//  $compile(ulElement)(scope);
//}
//
//function putPicInScope(pic) {
//  scope.$apply(function () {
//    scope.pic = pic;
//  });
//}
//
//function putPicInScopeAndCompile(pic) {
//  putPicInScope(pic);
//  compile('<li cb:picture="pic"></li>');
//}
