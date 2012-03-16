var cbModule = angular.module("clickbooq", []);

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

//http://jsfiddle.net/zdam/vGjXH/
