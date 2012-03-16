cbModule.directive('cbBetween', function ($compile) {
  return {
    replace:true,
    transclude:true,
    template: '<li class="between"><div></div></li>',
  link: function(scope, element, attrs){
    var newIndex = (typeof scope.$index === "undefined") ? 0 : scope.$index+1 ;
    scope.drop = function () {
      scope.pictures.sortPictures(scope.pictures.getSelected(), newIndex);
      scope.$apply();
    };
    $(element)
      .droppable({
        hoverClass:'vertical',
        tolerance:'pointer',
        drop: scope.drop
      })
  }}
});

cbModule.directive('cbPicture', function ($compile) {
//  compileElement.css('display', 'block');
  return {replace:true,
    transclude:true,
    scope:{
      cbPicture:'accessor',
      position: 'evaluate',
      pictures: 'evaluate'
    },
    template:'<li>' +
      '<img src="{{cbPicture().url}}" alt="{{cbPicture().name}}">' +
      '<span>{{position}}</span>' +
      '<div class="selected" style="visibility: {{selectedVisibility()}};"></div>' +
      '<div class="picture-menu" style="visibility: {{picMenuVisibility()}};">' +
      '<img src="../img/settings.gif" alt="?">' +
      '<img src="../img/delete.gif" alt="x">' +
      '</div>' +
      '</li>',
    link: function(scope, element, attrs) {
      scope.selectedVisibility = function() {
        return (scope.cbPicture().selected | scope.cbPicture().over) ? "visible" : "hidden";
      };
      scope.picMenuVisibility = function() {
        return scope.cbPicture().over ? "visible" : "hidden";
      };

      scope.cbPicture().element = element;
      var cloneWithNumber = function () {
        scope.cbPicture().selected = true;
        num = scope.pictures.getSelected(scope.pictures).length;
        $(this).find(".picture-menu").css("visibility", "hidden");
        var clone = $(this).clone()
          .css("opacity", 0.5)
          .css("position", "absolute");
        var dragDiv = $("<div style='position: absolute;' />");
        dragDiv.append(clone);
        if (num > 1) {
          dragDiv.append("<div class='drag-num'>"+num+"</div>");
        }
        return dragDiv; //.appendTo('ul.portfolio');
      }

      $(element)
        .draggable({ helper: cloneWithNumber, opacity: 0.6, zIndex: 10 });
    }
  }
});

//http://jsfiddle.net/zdam/vGjXH/


