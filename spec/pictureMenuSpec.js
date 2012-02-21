describe("Picture Menu", function () {

  describe("show Picture menu", function () {
    it("should add picture menu & pink-fade divs inside tag", function () {
      var div = $("<div/>");
      showPictureMenu(div);
      expect(div.children.length).toBe(2);
    });

  });
});
