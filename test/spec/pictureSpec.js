var theUrl = "http://zzz.net/photo.jpg";
var theName = "zen";
var pic = new Picture(theUrl, theName); // sets initial state

describe("Picture", function () {
    it("should have name", function () {
      expect(pic.name).toBe(theName);
    })
    it("should have url", function () {
      expect(pic.url).toBe(theUrl)
    })
    it("should not be selected", function () {
      expect(pic.selected).toBe(false);
    })
    it("should not have mouse over", function () {
      expect(pic.over).toBe(false);
    })
});

var html = function(html) {
  return $("<div/>").append(html).html();
}

describe("appendPicturesToPortfolio", function () {
  var expected = html("<li class='vertical'></li>"+
    "<li class='pic'>"+ "<img src='http://zzz.net/photo.jpg' alt='zen'>" + "<span>1</span>" +
    "<div class='selected'/>" +
    "<div class='picture-menu'><img src='../img/settings.gif' alt='?'><img src='../img/delete.gif' alt='x'>" + "</div>" +
    "</li>"+ "<li class='vertical'></li>").replace(/\s+/g,' ');
  it("should take an array of Pictures and append to portfolio element", function () {
    var portfolio = $("<div/>");
    appendPicturesToPortfolio([pic], portfolio);
    var portfolioHTML = portfolio.html().replace(/\s+/g,' ');
    expect(portfolioHTML.length).toEqual(expected.length);
    expect(portfolioHTML).toEqual(expected);
  })
  it("should work even if not a jQuery object", function () {
    var portfolio = $("<div/>")[0];
    appendPicturesToPortfolio([pic], portfolio);
    var portfolioHTML = portfolio.innerHTML;
    expect(portfolioHTML.length).toEqual(expected.length);
    expect(portfolioHTML).toEqual(expected);
  })
});

var selected, picMenu, portfolio, picLi;
portfolio = $('<div/>');
appendPicturesToPortfolio([pic], portfolio);
selected = portfolio.find('.selected');
picMenu = portfolio.find('.picture-menu');
picLi = portfolio.find('.pic');

describe("showPictureMenu", function () {
    it("should make picture-menu & selected divs visibility: visible", function () {
      expect(selected.length).toBe(1);
      expect(picMenu.length).toBe(1);
      expect(picMenu.children().length).toBe(2);
      showPictureMenu(picLi);
      expect(selected.css("visibility")).toBe("visible");
      expect(picMenu.css("visibility")).toBe("visible");
    });
    it("should work even if it is not passed a jQuery object", function () {
      var picLiDom = picLi[0];
      expect(picLiDom instanceof jQuery).toBe(false);
      showPictureMenu(picLiDom);
      expect(selected.css("visibility")).toBe("visible");
      expect(picMenu.css("visibility")).toBe("visible");
    });

});

describe("hide Picture menu", function () {
  it("should visibility: hidden the picture-menu", function () {
    showPictureMenu(picLi);
    hidePictureMenu(picLi);
    expect(picMenu.css("visibility")).toBe("hidden");
  });
  it("hidePictureMenu should work even if not a jQuery object", function () {
    showPictureMenu(picLi);
    hidePictureMenu(picLi[0]);
    expect(picMenu.css("visibility")).toBe("hidden");
  });
});

describe("hideSelected", function () {
  it("should visibility: hidden the selected", function () {
    showPictureMenu(picLi);
    hideSelected(picLi);
    expect(selected.css("visibility")).toBe("hidden");
  });
});

describe("fadePicture", function () {
  it("should set opacity: .6", function () {
    fadePicture(picLi);
    expect(picLi.children("img").css("opacity")).toEqual("0.6");
  });
});

describe("darkenPicture", function () {
  it("should set opacity: 1", function () {
    darkenPicture(picLi);
    expect(picLi.children("img").css("opacity")).toEqual("1");
  });
});

describe("selectPicture", function () {
  it("should be set to selected", function () {
    selectPicture(picLi);
    expect(picLi.children("img").attr("selected")).toBe("selected");
  })
});