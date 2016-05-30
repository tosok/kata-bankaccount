/**
 * Created by tsok on 28/05/2016.
 */
(function(angular) {
    'use strict';

    angular.module('bankaccount')
        .controller('WithdrawalController', WithdrawalController);

    /** @ngInject */
    function WithdrawalController(localStorageService, $uibModalInstance) {
        var vm = this;

        init();

        vm.amount = 0;
        vm.error = false;

        vm.save = Save;
        vm.ok = Ok;
        vm.cancel = Cancel;

        function Ok() {
            if (vm.amount <= 1) {
                vm.error = true;
                vm.errorMsg = "Minimum amount is 1€";
            } else if (vm.total < vm.amount) {
                vm.error = true;
                vm.errorMsg = "No money enough";
            }
            else {
                var deposit = {
                    amount: -vm.amount,
                    type: 'Withdrawal',
                    date: new Date()
                }
                Save(deposit);
                $uibModalInstance.close();
            };
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

        function init() {
            vm.moves = localStorageService.get('moves');
            vm.total = 0;
            _.each(vm.moves, function(num) {
                vm.total += num.amount.valueOf();
            });
        }

    }

})(angular);