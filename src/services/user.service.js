(function () {
    'use strict';

    angular
        .module('app')
        .service('userService', userService);

    userService.$inject = [
        'HTTPService',
        'CONST'
    ];

    function userService(HTTPService, CONST) {
        var sv = this;
        sv.getRepos = getRepos;

        function getRepos(user) {
            var url = CONST.api.base.concat('users/', user, '/repos');
            return HTTPService.get(url)
                .then(function (data) {
                   return data
                })
        }
    }
})();