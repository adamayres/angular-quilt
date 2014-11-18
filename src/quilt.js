'use strict';

angular.module('ngQuilt', ['ngComponent'])

  .constant('ngQuiltConfig', {
    quiltClass: function () {
      return 'container';
    },
    rowClass: function (row) {
      return 'row' + (row.id ? ' ' + row.id : '');
    },
    columnClass: function (column) {
      return 'col-md-' + column.width + (column.id ? ' column-' + column.id : '');
    }
  })

  .provider('$quiltCache', function $QuiltCacheProvider() {
    this.$get = ['$cacheFactory', function($cacheFactory) {
      return $cacheFactory('quilts');
    }];
  })

  .directive('ngQuilt', function (ngQuiltConfig, $http, $quiltCache) {
    return {
      restrict: 'EA',
      templateUrl: '/angular-quilt/src/quilt.tpl.html',
      scope: {
        quilt: '=?',
        quiltUrl: '@',
        container: '@'
      },
      link: function ($scope, $element) {
        angular.extend($scope, ngQuiltConfig);

        $scope.$watch('quiltUrl', function (val) {
          if (val) {
            $http.get($scope.quiltUrl, {cache: $quiltCache}).success(function(response) {
              $scope.quilt = response;
            });
          }
        });

        if ($scope.container !== false && $scope.container !== 'false') {
          $element.wrap('<div class="' + ngQuiltConfig.quiltClass() + '"></div>');
        }
      }
    };
  });
