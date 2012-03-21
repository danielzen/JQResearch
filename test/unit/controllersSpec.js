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

    var expectPicturesToBeInNewOrder = function (pictures, newOrder) {
      expect(scope.pictures.length).toBe(pictures.length);
      for (var i = 0; i < newOrder.length; i++) {
        var position = newOrder[i];
        expect(scope.pictures[i].selected).toBe(false);
        expect(scope.pictures[i].name).toBe(pictures[position].name);
      }
    };

    it('should have the same length and should sort the pics', function () {
      pictures[1].selected = true;
      pictures[2].selected = true;
      pictures[3].selected = true;
      var newIndex = 5;
      var sortedPictures = scope.sortPictures(newIndex);
      expectPicturesToBeInNewOrder(pictures, [0,4,1,2,3,5,6,7]);
    });

    it('should be able to have a newIndex == array.length', function () {
      pictures[0].selected = true;
      pictures[6].selected = true;
      var newIndex = pictures.length;
      var sortedPictures = scope.sortPictures(newIndex);
      expectPicturesToBeInNewOrder(pictures, [1,2,3,4,5,7,0,6]);
    });
  });

});

