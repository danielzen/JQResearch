
var showPictureMenu = function(item){
  var fade = $("<div class='pink-fade' />").css({ opacity: 0.4});
  $(item).append(fade);
  $(item).append($('<div class="picture-menu"><img src="../img/settings.gif" alt="settings"><img src="../img/delete.gif" alt="delete"></div>'));
};

var hidePictureMenu = function (item) {
  var jqItem = $(item);
  jqItem.find('.pink-fade').remove();
  jqItem.find('.picture-menu').remove();
};
