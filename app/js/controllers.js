var Picture = _class({
//  constructor:this,
  init:function (url, name) {
    this.url = url;
    this.name = name;
    this.selected = false;
    this.over = false;
    return this;
  }
});

function PicturePortfolioCtrl($scope, $templateCache, $compile) {
  $scope.pictures = [
    new Picture("../img/Chrysanthemum.jpg","Chrysanthemum"),
    new Picture("../img/Desert.jpg","Desert"),
    new Picture("../img/Hydrangeas.jpg","Hydrangeas"),
    new Picture("../img/Jellyfish.jpg","Jellyfish"),
    new Picture("../img/Koala.jpg","Koala"),
    new Picture("../img/Lighthouse.jpg","Lighthouse"),
    new Picture("../img/Penguins.jpg","Penguins"),
    new Picture("../img/Tulips.jpg","Tulips")
  ];

  $scope.isSelected = function (pic, selectedPics) {
    for (var j = 0; j < selectedPics.length; j++) {
      if (selectedPics[j].name == pic.name) {
        return true;
      }
    }
    return false;
  };

  $scope.selectedVisibility = function(pic) {
    return "visibility: " + ((pic.selected | pic.over) ? "visible" : "hidden");
  };

  $scope.picMenuVisibility = function(pic) {
    return "visibility: " + (pic.over ? "visible" : "hidden");
  };

  $scope.dragStart= function (pic) {
    return pic;
  };

  $scope.helper = function(pic) {
    pic.selected = true;
    pic.over = false;
    var helperElement = $($templateCache.get('helper-template'));
    var helperScope = $scope.$new();
    helperScope.pic = pic;
    $compile(helperElement)(helperScope);
    helperElement.find("img").css("opacity", 0.6);
    helperElement.find(".selected").css("opacity", 0.6);
    return helperElement;
  };

  $scope.sortPictures = function (newIndex) {
    var selectedPics = $scope.getSelected();
    var pictures = $scope.pictures;
    var orderedPics = new Array();
    for (var i = 0; i < pictures.length+1; i++) {
      if (i == newIndex) {
        for (var j = 0; j < selectedPics.length; j++) {
          orderedPics.push(selectedPics[j]);
        }
      }
      if (i<pictures.length && !$scope.isSelected(pictures[i], selectedPics)) {
        orderedPics.push(pictures[i]);
      }
    }
    $scope.pictures = orderedPics;
    for (var i = 0; i < selectedPics.length; i++) {
      selectedPics[i].selected = false;
    }
  };

  $scope.getSelected = function() {
    var pictures = $scope.pictures;
    var selected = new Array(); //$('<div/>');
    for (var i=0; i < pictures.length; i++) {
      if (pictures[i].selected) {
        selected.push(pictures[i]); //.append($(pictures[i].element).clone());
      }
    }
    return selected;
  };

}
