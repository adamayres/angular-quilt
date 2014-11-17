'use strict';

angular.module('ngQuiltCache', [])
  .provider('$quiltCache', function $QuiltCacheProvider() {
    this.$get = ['$cacheFactory', function($cacheFactory) {
      return $cacheFactory('quilts');
    }];
  });
