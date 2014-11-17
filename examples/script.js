'use strict';

var app = angular.module('quilt-demo', ['ngQuilt', 'ngComponent', 'ngRoute', 'hljs', 'ui.codemirror']);

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'documentation.html',
      tab: 'documentation'
    })
    .when('/documentation', {
      templateUrl: 'documentation.html',
      tab: 'documentation'
    })
    .when('/examples', {
      templateUrl: 'examples.html',
      tab: 'examples'
    });
});

app.run(function ($rootScope) {
  $rootScope.$on('$routeChangeSuccess', function (event, current) {
    $rootScope.tab = current.$$route.tab;
  });
});

app.controller('exampleCtrl', function ($scope) {
  $scope.quilt = {
    rows: [
      {
        id: 'header',
        columns: [
          {
            id: 'header',
            width: 12,
            components: [
              {
                id: 'test-header'
              }
            ]
          }
        ]
      }, {
        id: 'body',
        columns: [
          {
            id: 'main',
            width: 8,
            components: [
              {
                id: 'test-main',
                parameters: {
                  simpleParameter: 'value of parameter'
                }
              },
              {
                id: 'ng-quilt',
                parameters: {
                  container: false,
                  quilt: {
                    rows: [
                      {
                        id: 'nested-row',
                        columns: [
                          {
                            id: 'nested-column',
                            width: 6,
                            components: [
                              {
                                id: 'test-nested'
                              }
                            ]
                          },
                          {
                            id: 'nested-column',
                            width: 6,
                            components: [
                              {
                                id: 'test-nested'
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            ]
          },
          {
            id: 'side',
            width: 4,
            components: [
              {
                id: 'test-side',
                parameters: {
                  complexParam: {
                    foo: 'bar'
                  }
                }
              }
            ]
          }
        ]
      },
      {
        id: 'footer',
        columns: [
          {
            id: 'footer',
            width: 12,
            components: [
              {
                id: 'test-footer'
              }
            ]
          }
        ]
      }
    ]
  };
});

app.directive('testHeader', function () {
  return {
    restrict: 'E',
    template: '<div class="well">Header</div>'
  };
});

app.directive('testMain', function () {
  return {
    restrict: 'E',
    scope: {
      simpleParameter: '@'
    },
    template: '<div class="well">Main <span ng-if="simpleParameter">[{{simpleParameter}}]</span></div>'
  };
});

app.directive('testSide', function () {
  return {
    restrict: 'E',
    scope: {
      complexParam: '='
    },
    template: '<div class="well">Side <span ng-if="complexParam">[{{complexParam}}]</span></div>'
  };
});

app.directive('testNested', function () {
  return {
    restrict: 'E',
    template: '<div class="well">Nested</div>'
  };
});

app.directive('testFooter', function () {
  return {
    restrict: 'E',
    template: '<div class="well">Footer</div>'
  };
});
