/* App Controllers */
function PicturePortfolioCtrl($scope, jQueryUI) {
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
//  $scope.picture=$scope.pictures[0];
}
