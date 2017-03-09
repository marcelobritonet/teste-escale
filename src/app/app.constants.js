(function () {
    'use strict';

    angular
        .module('app')
        .constant('CONST', {
            api : {
                base: 'https://api.github.com/',
                // repos: 'https://api.github.com/users/marcelobritonet/repos'
            }
        });
})();