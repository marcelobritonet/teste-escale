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

        vm.ordernarRepos = 'name';
        vm.filtroLinguagem = '';
        // user test 'wilfernandesjr'


        vm.$onInit = onInit;
        vm.searchUser = searchUser;
        vm.getStarredRepos = getStarredRepos;

        function onInit() {
            vm.ordernarRepos = 'name';
            vm.filtroLinguagem = '';

            var user = $stateParams.user;
            getStarredRepos(user);
            vm.user = user;
        }

        function getRepos(user) {
            if (!user) return;
            vm.getRepos.loading = true;

            userService.getRepos(user)
                .then(function (repos) {
                    vm.getRepos.loading = false;
                    vm.repos = repos;
                })
        }

        function getStarredRepos(user) {
            if (!user) return;
            delete vm.languageList;
            delete vm.filtroLinguagem;
            delete vm.getStarredRepos.err;
            delete vm.repos;

            userService.getStarredRepos(user)
                .then(function (repos) {
                    vm.repos = repos;
                    vm.languageList = getLanguagesList(repos);
                    console.log(repos)
                })
                .catch(function (err) {
                    console.log(err);
                    vm.getStarredRepos.err = true;
                })
                .finally(function () {
                    vm.getStarredRepos.loading = false;
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