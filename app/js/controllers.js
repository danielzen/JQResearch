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

function PicturePortfolioCtrl($scope, jqueryUI) {
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

  $scope.select = function (pic) {
    pic.selected=!pic.selected;
  }

  selected = new Object();
//  $scope.picture=$scope.pictures[0];

}
