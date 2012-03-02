/* jasmine specs for widgets go here */
'use strict';

describe('cb:picture', function () {
  var scope, ulElement, element, $compile, url, name;

  beforeEach(inject(function ($injector, $rootScope) {
    scope = $rootScope;
    $compile = $injector.get('$compile');
    ulElement = element = null;
    url = 'http://example.com/pic';
    name = "picName";
  }));

  function compile(html) {
    ulElement = $('<ul>' + html + '</ul>');
    element = ulElement.find('li');
    scope.$apply("$index=0");
    $compile(ulElement)(scope);
  }

  function putPicInScope(pic) {
    scope.$apply(function () {
      scope.pic = pic;
    });
  }

  function putPicInScopeAndCompile(pic) {
    putPicInScope(pic);
    compile('<li cb:picture="pic"></li>');
  }

  it('should compile', function () {
    putPicInScopeAndCompile({url:url, name:name});
    expect(element.find("img").attr("src")).toBe(url);
    expect(element.find("img").attr("alt")).toBe(name);
    expect(element.text()).toBe('1');
    expect(element.find(".selected").css("visibility")).toBe("hidden")
    expect(element.find(".picture-menu").css("visibility")).toBe("hidden")
  });

  it('should have selected div visible if selected', function () {
    putPicInScopeAndCompile({url:url, name:name, selected:true});
    expect(element.find(".picture-menu").css("visibility")).toBe("hidden")
    expect(element.find(".selected").css("visibility")).toBe("visible")
  })

  it('should have picture-menu div & selected div visible if over', function () {
    putPicInScopeAndCompile({url:url, name:name, selected:false, over:true});
    expect(element.find(".picture-menu").css("visibility")).toBe("visible");
    expect(element.find(".selected").css("visibility")).toBe("visible");
  })

//  it('should react to a modification?', function() {
//    putPicInScopeAndCompile({url:url, name:name, selected:false, over:false});
//    expect(element.find(".selected").css("visibility")).toBe("hidden")
//    putPicInScope({url:url, name:name, selected:true, over:true})
//    expect(element.find(".selected").css("visibility")).toBe("visible")
//  })

});
