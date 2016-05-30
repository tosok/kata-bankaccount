/**
 * Created by tsok on 28/05/2016.
 */
(function(angular) {
    'use strict';

    angular.module('bankaccount')
        .controller('DepositController', DepositController);

    /** @ngInject */
    function DepositController(localStorageService, $uibModalInstance) {
        var vm = this;

        vm.amount = 0;
        vm.error = false;

        vm.save = Save;
        vm.ok = Ok;
        vm.cancel = Cancel;

        function Ok() {
            if (vm.amount <= 1) {
                vm.error = true;
                vm.errorMsg = "Minimum amount is 1€";
            } else {
                var deposit = {
                    amount: vm.amount,
                    type: 'Deposit',
                    date: new Date()
                };
                Save(deposit);
                $uibModalInstance.close();
            }
        }

        function Cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        function Save(value) {
            var moves = localStorageService.get('moves');
            if (!moves) {
                moves = [];
            }
            moves.push(value);
            localStorageService.set('moves', moves);
        }

    }

})(angular);