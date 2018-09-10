'use strict';

function PlayerService() {
    const vm = this;

    vm.playerHealth = 3;
    vm.battles = 0;
    

    vm.resetPlayer = () => {
        vm.playerHealth = 3
        vm.battles = 0;
    }
}

angular.module('app').service('PlayerService', PlayerService);