/* jasmine specs for controllers go here */
describe('PicturePortfolioCtrl', function () {
  var scope, pictures;
  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    var ctrl = $controller(PicturePortfolioCtrl, {$scope: scope});
    pictures = scope.pictures;
  }));

  describe('Pictures', function () {
    it('should create "pictures" model with 8 inside', function () {
      expect(pictures.length).toBe(8);
    });
    it('should contain Pictures with name and url', function () {
      var picture = pictures[0];
      expect(picture instanceof Picture).toBe(true);
      expect(picture.url).toBeDefined();
      expect(picture.name).toBeDefined();
    });
  });

  describe("isSelected", function () {
    it("should return true if the picture is in the selected array", function () {
      var selectedPics = [pictures[1],pictures[2],pictures[3]];
      expect(scope.isSelected(pictures[0], selectedPics)).toBe(false);
      expect(scope.isSelected(pictures[1], selectedPics)).toBe(true);
      expect(scope.isSelected(pictures[2], selectedPics)).toBe(true);
      expect(scope.isSelected(pictures[3], selectedPics)).toBe(true);
      expect(scope.isSelected(pictures[4], selectedPics)).toBe(false);
    });
  });

  function cloneArray(array) {
    return array.slice(0);
  }

  describe('sortPictures', function () {
    it('should have the same length and should sort the pics', function () {
      var oldPics = cloneArray(pictures);
      var selectedPics = [pictures[1],pictures[2],pictures[3]];
      var newIndex = 5;
      var sortedPictures = pictures.sortPictures(selectedPics, newIndex);
      expect(pictures.length) .toBe(oldPics.length);
      expect(pictures[0].name).toBe(oldPics[0].name);
      expect(pictures[1].name).toBe(oldPics[4].name);
      expect(pictures[2].name).toBe(oldPics[1].name);
      expect(pictures[3].name).toBe(oldPics[2].name);
      expect(pictures[4].name).toBe(oldPics[3].name);
      expect(pictures[5].name).toBe(oldPics[5].name);
      expect(pictures[6].name).toBe(oldPics[6].name);
      expect(pictures[7].name).toBe(oldPics[7].name);
    });
  });

});

