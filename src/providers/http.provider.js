(function () {
    'use strict';
    angular
        .module('app')
        .service('HTTPService', HTTPService);

    HTTPService.$inject = ['$http'];

    function HTTPService($http) {
        this.get = get;
        this.post = post;
        var debug = true;

        function get(path, params, headers) {
            path = path + '?' + Math.round(Math.random() * 10000);

            return $http
                .get(path, {
                    params: params,
                    headers: headers
                })
                .then(complete)
                .catch(error);

            function complete(data, status, headers, config) {
                return data.data;
            }

            function error(message) {
                if (debug) {
                    console.log('XHR Failed: ', message);
                    console.log('Path: ', path);
                    console.log('Params: ', params);
                }
                throw message;
            }
        }

        function post(path, data, headers) {
            return $http
                .post(path, data, {
                    headers: headers
                })
                .then(complete)
                .catch(error);

            function complete(data, status, headers, config) {
                return data.data;
            }

            function error(message) {
                if (debug) {
                    console.log('XHR Failed: ', message);
                    console.log('Path: ', path);
                    console.log('Params: ', params);
                }
                throw message;
            }
        }
    }
})();