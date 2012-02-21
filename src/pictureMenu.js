
var hidePictureMenu = function() {
  $('.pink-fade').remove();
  $('.picture-menu').remove();
}

var showPictureMenu = function(item){
  var fade = $("<div class='pink-fade' />").css({ opacity: 0.4});
  $(item).append(fade); //.mouseleave(function () { console.log("out"); hidePictureMenu(); });
  $(item).append($('<div class="picture-menu"><img src="../img/settings.gif" alt="settings"><img src="../img/delete.gif" alt="delete"></div>'));
}