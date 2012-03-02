/* jasmine specs for controllers go here */
describe('PicturePortfolioCtrl', function () {
  var ctrl;
  beforeEach(function () {
    ctrl = new PicturePortfolioCtrl();
  });

  describe('Pictures', function () {
    it('should create "pictures" model with 8 inside', function () {
      expect(ctrl.pictures.length).toBe(8);
    });
    it('should contain Pictures with name and url', function () {
      var picture = ctrl.pictures[0];
      expect(picture instanceof Picture).toBe(true);
      expect(picture.url).toBeDefined();
      expect(picture.name).toBeDefined();
    });
  });

});

