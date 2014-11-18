'use strict';

angular.module('ngComponent', []).
  directive('ngComponent', function ($compile, $injector, $log) {

    var PREFIX_REGEXP = /^(x[\:\-_]|data[\:\-_])/i;
    var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
    var MOZ_HACK_REGEXP = /^moz([A-Z])/;
    var SNAKE_CASE_REGEXP = /[A-Z]/g;

    /**
     * Converts snake_case to camelCase.
     * Also there is special case for Moz prefix
     * starting with upper case letter.
     *
     * @param name Name to normalize
     */
    function camelCase (name) {
      return name.
        replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
          return offset ? letter.toUpperCase() : letter;
        }).
        replace(MOZ_HACK_REGEXP, 'Moz$1');
    }

    function directiveNormalize (name) {
      return camelCase(name.replace(PREFIX_REGEXP, ''));
    }

    function snakeCase (name, separator){
      separator = separator || '_';
      return name.replace(SNAKE_CASE_REGEXP, function(letter, pos) {
        return (pos ? separator : '') + letter.toLowerCase();
      });
    }

    return {
      restrict: 'EA',
      scope: {
        id: '=',
        parameters: '=?',
        element: '=?',
        class: '=?',
        decorate: '=?'
      },
      link: function ($scope, $element) {
        $scope.$watch('id', function() {
          var directive = directiveNormalize($scope.id) + 'Directive';

          if (!$injector.has(directive)) {
            $log.warn('No directive with the id: [' + $scope.id + '] exists. Checked as: [' + directive + '].');
          } else {
            var componentElement;

            if ($scope.element) {
              componentElement = angular.element('<' + $scope.element + ' ' + $scope.id + '>');
            } else {
              componentElement = angular.element('<' + $scope.id + '>');
            }

            angular.forEach($scope.parameters, function (parameterValue, parameterName) {
              if (parameterName !== 'length') {
                if (angular.isFunction(parameterValue) || angular.isObject(parameterValue)) {
                  // if the value is a function or object then we put in on the
                  // scope to allow the component to use it and pass by name
                  componentElement.attr(snakeCase(parameterName, '-'), parameterName);
                  $scope[parameterName] = parameterValue;
                } else {
                  componentElement.attr(snakeCase(parameterName, '-'), parameterValue);
                }
              }
            });

            if ($scope.decorate) {
              var decorateElement = angular.element('<' + $scope.decorate.id + '>');
              decorateElement.append(componentElement);
              $element.append(decorateElement);
            } else {
              $element.append(componentElement);
            }

            $compile($element.contents())($scope);
          }
        });
      }
    };
  });
