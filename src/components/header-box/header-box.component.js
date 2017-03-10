(function () {
    'use strict';

    angular
        .module('app')
        .component('headerBox', {
            templateUrl: 'components/header-box/header-box.template.html',
            controller: HeaderBoxController,
            controllerAs: 'vm'
        });

    HeaderBoxController.$inject = [
    ];

    function HeaderBoxController() {
        var vm = this;
    }
})();