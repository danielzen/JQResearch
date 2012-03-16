'use strict';

describe('cb-picture', function () {
  var element, url, name;

  beforeEach(function () {
    module('clickbooq');
    element = null;
    url = 'http://example.com/pic';
    name = "picName";
  });

  function createScopePutPicInRootCompile(pic, $rootScope, $compile) {
    var directiveScope = $rootScope.$new();
    $rootScope.pic = pic;
    element = $compile('<li cb-picture="pic" position="4"></li>')(directiveScope);
    directiveScope.$apply();
    return directiveScope;
  }

  it('should compile with basic template structure', inject(function ($rootScope, $compile) {
    createScopePutPicInRootCompile({url:url, name:name}, $rootScope, $compile);
    expect(element.find("img").attr("src")).toBe(url);
    expect(element.find("img").attr("alt")).toBe(name);
    expect(element.text()).toBe('4');
    expect(element.find(".selected").css("visibility")).toBe("hidden");
    expect(element.find(".picture-menu").css("visibility")).toBe("hidden")
  }));

  it('should have selected div visible if selected', inject(function ($rootScope, $compile) {
    createScopePutPicInRootCompile({url:url, name:name, selected:true}, $rootScope, $compile);
    expect(element.find(".picture-menu").css("visibility")).toBe("hidden")
    expect(element.find(".selected").css("visibility")).toBe("visible")
  }));

  it('should have picture-menu div & selected div visible if over', inject(function ($rootScope, $compile) {
    createScopePutPicInRootCompile({url:url, name:name, selected:false, over:true}, $rootScope, $compile);
    expect(element.find(".picture-menu").css("visibility")).toBe("visible");
    expect(element.find(".selected").css("visibility")).toBe("visible");
  }));

  it('should react to a modification?', inject(function ($rootScope, $compile) {
    var scope = createScopePutPicInRootCompile({url:url, name:name, selected:false}, $rootScope, $compile);
    expect(element.find(".selected").css("visibility")).toBe("hidden");
    $rootScope.pic = {url:url, name:name, selected:true, over:true};
    scope.$apply();
    expect(element.find(".selected").css("visibility")).toBe("visible")
  }));

});

describe("cbBetween", function () {

  beforeEach(function () {
    module('clickbooq');
  });

  function createScopePutPicInRootCompile(pic, $rootScope, $compile) {
    var directiveScope = $rootScope.$new();
    $rootScope.pic = pic;
    element = $compile('<li cb-between pictures="pictures" position="3"></li>')(directiveScope);
    directiveScope.$apply();
    return directiveScope;
  }
  it("should compile with basic template", function () {

  });
});