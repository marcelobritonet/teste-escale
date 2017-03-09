(function () {
    'use strict';

    angular
        .module('app')
        .filter('trustUrl', function ($sce) {
            return function(url) {
                return $sce.trustAsResourceUrl(url);
            };
        });
})();