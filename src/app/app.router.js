(function () {
    'use strict';

    angular
        .module('app')
        .config(appRouter);

    appRouter.$inject = ['$stateProvider', '$urlRouterProvider'];

    function appRouter($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                views: {
                    'header':{
                        template: '<header-box></header-box>'
                    },
                    'main': {
                        template: '<lista-diretorios></lista-diretorios>'
                    }
                }
            });
    }
})();