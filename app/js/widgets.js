cbModule.directive('cbBetween', function ($compile) {
  return {replace:true,
    transclude:true,
    template: '<li class="between"><div class="vertical"></div></li>',
  link: function(scope, element, attrs){
    $(element)
      .mouseover(function () {
      $(this).find("div").css("visibility", "visible");
    })
      .mouseout(function () {
      $(this).find("div").css("visibility", "hidden");
    });
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
      scope.cbPicture().element = element;
      scope.selectedVisibility = function() {
        return (scope.cbPicture().selected | scope.cbPicture().over) ? "visible" : "hidden";
      };
      scope.picMenuVisibility = function() {
        return scope.cbPicture().over ? "visible" : "hidden";
      };

      var numSelected = function(pictures) {
        var numSelected = 0; //$('<div/>');
        for (var i=0; i < pictures.length; i++) {
          if (pictures[i].selected) {
            numSelected++; //.append($(pictures[i].element).clone());
          }
        }
        return numSelected;
      }

      $(element)
        .drag("start", function () {
          scope.cbPicture().selected = true;
          num = numSelected(scope.pictures);
          var clone = $(this).clone()
            .css("opacity", 0.5)
            .css("position", "absolute")
          var dragDiv = $("<div style='position: absolute;' />");
          dragDiv.append(clone);
          dragDiv.append("<div class='drag-num'>"+num+"</div>");
          return dragDiv.appendTo('ul.portfolio');
        })
        .drag(function (ev, dd) {
          $(dd.proxy).css({
            top:dd.offsetY,
            left:dd.offsetX
          });
        })
        .drag("end", function (ev, dd) {
          $(dd.proxy).remove();
        });

    }
  }
});

//http://jsfiddle.net/zdam/vGjXH/
cbModule.factory('jqueryUI', function ($window, $templateCache, $document, $compile) {
  return {
    wrapper: function (cssSelector, pluginName, options, templateName, dialogScope) {
      if (templateName) {
        var templateDom = $($templateCache.get(templateName));
        $document.append(templateDom);
        $compile(templateDom)(dialogScope);
      }
      $(cssSelector)[pluginName](options);
    },

    performAction: function(cssSelector, pluginName, action, options) {
      if(options){
        $(cssSelector)[pluginName](action, options);
      }else {
        $(cssSelector)[pluginName](action);
      }

    }
  };
});


