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

function PicturePortfolioCtrl($scope) {
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

  $scope.pictures.sortPictures = function (selectedPics, newIndex) {
    var pictures = $scope.pictures;
    var orderedPics = new Array();
    for (var i = 0; i < pictures.length; i++) {
      if (i == newIndex) {
        for (var j = 0; j < selectedPics.length; j++) {
          orderedPics.push(selectedPics[j]);
        }
      }
      if (!$scope.isSelected(pictures[i], selectedPics)) {
        orderedPics.push(pictures[i]);
      }
    }
    for (var i = 0; i < pictures.length; i++) {
      pictures[i]=orderedPics[i];
    }
  };

  $scope.pictures.getSelected = function() {
    var pictures = $scope.pictures;
    var selected = new Array(); //$('<div/>');
    for (var i=0; i < pictures.length; i++) {
      if (pictures[i].selected) {
        selected.push(pictures[i]); //.append($(pictures[i].element).clone());
      }
    }
    return selected;
  };

  $scope.select = function (pic) {
    pic.selected=!pic.selected;
  };

  selected = new Object();
//  $scope.picture=$scope.pictures[0];

}
