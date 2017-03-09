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

        }
    }
})();