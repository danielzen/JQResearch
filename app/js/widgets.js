var cbModule = angular.module("clickbooq", []);

cbModule.directive('cbPicture', function ($compile) {
//  compileElement.css('display', 'block');
  return {replace:true,
    transclude:true,
    scope:{
      cbPicture:'accessor',
      position: 'evaluate'
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
//
//      scope.over = function() {
//        return scope.cbPicture().over ? 'O' : 'o';
//      };
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


