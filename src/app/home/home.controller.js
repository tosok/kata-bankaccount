/**
 * Created by tsok on 28/05/2016.
 */
(function(angular) {
    'use strict';

    angular.module('bankaccount')
        .controller('HomeController', HomeController);

    /** @ngInject */
    function HomeController(localStorageService, $uibModal) {
        var vm = this;

        init();

        vm.titles = [
            { id: 0, label: 'Date' },
            { id: 1, label: 'Type'},
            { id: 2, label: 'Amount'}
        ];

        vm.save = Save;
        vm.retrieve = Retrieve;

        function Save() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: '../deposit/deposit.modal.html',
                controller: 'DepositController',
                controllerAs: 'deposit'
            });

            modalInstance.result.then(function () {
                init();
            });
        }

        function Retrieve() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: '../withdrawal/withdrawal.modal.html',
                controller: 'WithdrawalController',
                controllerAs: 'withdrawal'
            });

            modalInstance.result.then(function () {
                init();
            });
        }

        function init() {
            vm.moves = localStorageService.get('moves');
            vm.total = 0;
            _.each(vm.moves, function(num) {
                vm.total += num.amount.valueOf();
            });
        }

    }

})(angular);