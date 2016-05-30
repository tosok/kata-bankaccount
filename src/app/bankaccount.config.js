/**
 * Created by tsok on 28/05/2016.
 */
(function(angular) {
    'use strict';

    angular.module('bankaccount').config(BankaccountConfig);

    /** @ngInject */
    function BankaccountConfig($stateProvider, $urlRouterProvider, localStorageServiceProvider) {

        localStorageServiceProvider.setPrefix('bankaccount');

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url : '/',
                templateUrl: 'home/home.html',
                controllerAs:'home',
                controller: 'HomeController'
            });


    };

})(angular);