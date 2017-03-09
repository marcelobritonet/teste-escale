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
        'userService'
    ];

    function ListaDiretoriosController(userService) {
        var vm = this;

        vm.user = 'wilfernandesjr';
        vm.ordernarRepos = 'name';
        vm.filtroLinguagem = '';

        vm.getRepos = getRepos;
        vm.getStarredRepos = getStarredRepos;

        function getRepos(user) {
            vm.getRepos.loading = true;

            userService.getRepos(user)
                .then(function (repos) {
                    vm.getRepos.loading = false;
                    vm.repos = repos;
                })
        }
        
        function getStarredRepos(user) {
            delete vm.languageList;
            delete vm.filtroLinguagem;

            userService.getStarredRepos(user)
                .then(function (repos) {
                    vm.getStarredRepos.loading = false;
                    vm.repos = repos;
                    vm.languageList = getLanguagesList(repos);
                    console.log(repos)
                })
        }

        function getLanguagesList(repos) {
            var list = [];

            for (var i = 0; repos.length > i; i++){
                if(repos[i].language) list.push(repos[i].language)
            }
            return list.filter(function (param, i) {
                return list.indexOf(param) == i
            });
        }
    }
})();