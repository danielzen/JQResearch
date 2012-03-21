
    var link = function(scope, element, attrs) {

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


//http://jsfiddle.net/zdam/vGjXH/


