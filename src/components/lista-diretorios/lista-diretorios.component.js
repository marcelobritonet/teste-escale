(function () {
    'use strict';

    angular
        .module('app')
        .component('listaDiretorios', {
            templateUrl: 'components/lista-diretorios/lista-diretorios.template.html',
            controller: ListaDiretoriosController,
            controllerAs: 'vm'
        });

    ListaDiretoriosController.$inject = [
        'userService',
        '$stateParams',
        '$state'
    ];

    function ListaDiretoriosController(userService, $stateParams, $state) {
        var vm = this;
        // user test 'wilfernandesjr'


        vm.$onInit = onInit;
        vm.searchUser = searchUser;
        vm.getStarredRepos = getStarredRepos;

        function onInit() {
            var user = $stateParams.user;
            getStarredRepos(user);
            vm.user = user;
        }

        function getStarredRepos(user) {
            if (vm.getStarredRepos.loading) return false;
            if (!user) return false;

            vm.getStarredRepos.loading = true;

            delete vm.repos;
            delete vm.languageList;
            delete vm.filtroLinguagem;
            delete vm.getStarredRepos.err;

            userService.getStarredRepos(user)
                .then(function (repos) {
                    vm.repos = repos;
                    vm.languageList = getLanguagesList(repos);
                })
                .catch(function (err) {
                    console.log(err);
                    vm.getStarredRepos.err = true;
                })
                .finally(function () {
                    delete vm.getStarredRepos.loading;
                })
        }

        function getLanguagesList(repos) {
            var list = [];

            for (var i = 0; repos.length > i; i++) {
                if (repos[i].language) list.push(repos[i].language)
            }
            return list.filter(function (param, i) {
                return list.indexOf(param) == i
            });
        }

        function searchUser(user) {
            var params = {user: user};
            $state.go('home', params);
        }
    }
})();