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
                views: {
                    'main': {
                        templateUrl: 'partials/header.html'
                    }
                }
            });
    }
})();