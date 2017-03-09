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
        sv.getStarredRepos = getStarredRepos;

        function getRepos(user) {
            var url = CONST.api.base.concat('users/', user, '/repos');
            var headers = { Authorization : CONST.api.access_token};

            return HTTPService.get(url, {}, headers)
                .then(function (data) {
                   return data
                })
        }

        function getStarredRepos(user) {
            var url = CONST.api.base.concat('users/', user, '/starred'),
                headers = {};
            // var headers = { Authorization : CONST.api.access_token};
            // var headers = { Authorization : 'token ' + CONST.api.access_token};

            return HTTPService.get(url, {}, headers)
                .then(function (data) {
                    return data
                })
        }
    }
})();