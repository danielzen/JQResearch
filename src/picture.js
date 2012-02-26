var Picture = _class({
//  constructor:this,
  init:function (url, name) {
    this._url = url;
    this._name = name;
    return this;
  },
  getUrl:function () {
    return this._url;
  },
  getName:function () {
    return this._name;
  }
})

angular.widget('cb:picture', function(compileElement){
  var compiler = this;
  compileElement.css('display', 'block');
  var urlExp = compileElement.attr('url');
  var nameExp = compileElement.attr('name');
  return function(linkElement){
    var image = angular.element('<img src="'+urlExp+'" alt="'+nameExp+'">');
    var position = angular.element('<span>'+1+'</span>');
    var selected = angular.element('<div class="selected" style="visibility: hidden; "></div>');
    var picMenu = angular.element('<div class="picture-menu" style="visibility: hidden; "><img src="../img/settings.gif" alt="?"><img src="../img/delete.gif" alt="x"></div>');
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

var appendPicturesToPortfolio = function(pictures, portfolio) {
  var vertical = "<li class='vertical'/>";
  var length = pictures.length;
  if (length > 0) portfolio.append(vertical);
  for (var i = 0; i < length; i++) {
    var pic = pictures[i];
    var liPic = $("<li class='pic'/>");
    liPic.append("<img src='"+pic.getUrl()+"' alt='"+pic.getName()+"'>");
    liPic.append("<span>"+ (i+1) +"</span>");
    liPic.append($("<div class='selected'/>"));
    var picMenu = $("<div class='picture-menu'>");
    picMenu.append("<img src='../img/settings.gif' alt='?'>");
    picMenu.append("<img src='../img/delete.gif' alt='x'>");
    liPic.append(picMenu);
    portfolio.append(liPic);
    portfolio.append(vertical);
  }
//  return portfolio;
};

var showPictureMenu = function(item){
  item = $(item);
  item.children(".selected").css("visibility", "visible");
  item.children(".picture-menu").css("visibility", "visible");
};

var hidePictureMenu = function (item) {
  $(item).children(".picture-menu").css("visibility", "hidden");
};

var hideSelected = function (item) {
  $(item).children(".selected").css("visibility", "hidden");
};

var fadePicture = function (item) {
  $(item).children("img").css("opacity", .6);
}

var darkenPicture = function (item) {
  $(item).children("img").css("opacity", 1);
}

var selectPicture = function (item) {
  $(item).children("img").attr("selected", "selected");
}