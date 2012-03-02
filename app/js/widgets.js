/* http://docs.angularjs.org/#!angular.widget */

angular.widget('@cb:picture', function (picExp, compileElement) {
//  compileElement.css('display', 'block');
  return function (linkElement) {
    var self = this;
    function update() {
      var pic = self.$eval(picExp);
      var image = angular.element('<img src="' + pic.url + '" alt="' + pic.name + '">');
      var position = angular.element('<span>' + (self.$index + 1) + '</span>');
      var selectedVisibility = (pic.selected | pic.over) ? "visible" : "hidden";
      var picMenuVisibility = pic.over ? "visible" : "hidden";
      var selected = angular.element('<div class="selected" style="visibility: '+selectedVisibility+'; "></div>');
      var picMenu = angular.element('<div class="picture-menu" style="visibility: '+picMenuVisibility+'; "><img src="../img/settings.gif" alt="?"><img src="../img/delete.gif" alt="x"></div>');
      linkElement.append(image);
      linkElement.append(position);
      linkElement.append(selected);
      linkElement.append(picMenu);
    }

    update();
//    self.$watch(picExp, function (scope, newValue, oldValue) {
//      console.log(newValue);
//    });
  };
});


