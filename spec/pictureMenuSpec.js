describe("Picture Menu", function () {

  var div = $("<div/>");
  showPictureMenu(div);
  var picMenu = div.children('div.picture-menu');

  describe("show Picture menu", function () {
    it("should add picture-menu & pink-fade divs inside tag", function () {
      expect(div.children('div').length).toBe(2);
      expect(picMenu.length).toBe(1);
      expect(div.children('div.pink-fade').length).toBe(1);
    });
    it("should have setting and delete imgs inside picture menu", function() {
      expect(picMenu.children.length).toBe(2);
      expect(picMenu.children('img').length).toBe(2);
    });
  });

  describe("hide Picture menu", function () {
    it("should remove the picture-menu & pink-fade divs inside tag", function () {
      expect(div.children('div').length).toBe(2);
      hidePictureMenu(div);
      expect(div.children('div').length).toBe(0);
    });
  });
});
