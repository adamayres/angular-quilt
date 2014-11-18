'use strict';

var app = angular.module('quilt-demo', ['ngQuilt', 'ngComponent', 'ui.codemirror']);

app.controller('exampleCtrl', function ($scope) {

  $scope.editorOptions = {
    lineWrapping : true,
    lineNumbers: true,
    mode: {
      name: 'javascript',
      json: true
    },
    theme: 'monokai',
    height: '1000px'
  };

  $scope.examples = [
    {
      url: '/examples/basic.quilt.json',
      label: 'Basic'
    },
    {
      url: '/examples/all.quilt.json',
      label: 'All Features Quilt'
    },
    {
      url: '/examples/decorate.quilt.json',
      label: 'Component Decorator'
    },
  ];

  $scope.quiltUrl = $scope.examples[0];

  $scope.$watch('quilt', function (val) {
    $scope.quiltStr = angular.toJson(val, true);
  });

  $scope.$watch('quiltStr', function (val) {
    try {
      $scope.quilt = angular.fromJson(val);
    } catch (e) {
      //
    }
  });
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

app.directive('testContent', function () {
  return {
    restrict: 'E',
    scope: {
      content: '@'
    },
    template: '<div class="well" ng-bind="content"></div>'
  };
});

app.directive('testDecorator', function () {
  return {
    restrict: 'EA',
    transclude: true,
    template: '' +
      '<div class="panel panel-default">' +
        '<div class="panel-heading">[{{id}}] Directive</div>' +
        '<div class="panel-body" ng-transclude></div>' +
      '</div>'
  };
});
