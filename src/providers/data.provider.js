(function() {
    'use strict';

    angular
        .module('app')
        .service('DataFactory', DataFactory);

    DataFactory.$inject = [];

    function DataFactory() {
        this.data = {};
    }
})();
