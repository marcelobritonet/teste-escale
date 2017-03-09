(function () {
    'use strict';

    angular
        .module('app')
        .constant('CONST', {
            api : {
                base: 'https://api.github.com/',
                access_token: 'abfa1295878441aca9a67a4bffabb6840ac8b913'
                // repos: 'https://api.github.com/users/marcelobritonet/repos'
            }
        });
})();