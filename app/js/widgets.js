/* http://docs.angularjs.org/#!angular.widget */

angular.widget('cb:picture', function(compileElement){
  var compiler = this;
  compileElement.css('display', 'block');
  var urlExp = compileElement.attr('url');
  var nameExp = compileElement.attr('name');
  return function(linkElement){
    var image = angular.element('<img src="'+urlExp+'" alt="'+nameExp+'">');
    var position = angular.element('<span>'+1+'</span>');
    var selected = angular.element('<div class="selected" style="visibility: hidden; "></div>');
    var picMenu = angular.element('<div class="picture-menu" style="visibility: hidden; "><img src="../app/img/settings.gif" alt="?"><img src="../app/img/delete.gif" alt="x"></div>');
    linkElement.append(image);
    linkElement.append(position);
    linkElement.append(selected);
    linkElement.append(picMenu);
    this.$watch(urlExp, function(value){
      image.text(value);
    });
    this.$watch(nameExp, function(value){
      image.text(value);
    });
  };
});

