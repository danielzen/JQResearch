/**
 * Created by JetBrains RubyMine.
 * User: zen
 * Date: 3/1/12
 * Time: 4:19 PM
 * To change this template use File | Settings | File Templates.
 */
angular.directive('cb:mouseover', function(expression, compiledElement) {
  var compiler = this;
  compiler.descend(true);
  compiler.directives(true);
  return function(linkElement) {
    var scope = this;
    linkElement.mouseenter(function(event) {
      scope.$apply(function() {
        scope.$eval(expression);
      });
      event.stopPropagation();
    });
  };
});

angular.directive('cb:mouseout', function(expression, compiledElement) {
  return function(linkElement) {
    var scope = this;
    linkElement.mouseleave(function(event) {
      scope.$apply(function() {
        scope.$eval(expression);
      });
      event.stopPropagation();
    });
  };
});