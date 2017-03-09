(function () {
    'use strict';

    angular
        .module('app')
        .component('listaDiretorios', {
            templateUrl: 'components/lista-diretorios/lista-diretorios.template.html',
            controller: ListaDiretoriosController,
            controllerAs: 'vm'
        });

    ListaDiretoriosController.$inject = [];

    function ListaDiretoriosController() {
        var vm = this;
        vm.teste = 'dentro do component';
        console.log(vm)
    }
})();