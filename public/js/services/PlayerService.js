'use strict';

function PlayerService() {
    const vm = this;

    vm.playerHealth = 3;
    vm.battles = 0;

    vm.getPlayerHealth = () => {
        return vm.playerHealth;
    }

    vm.setPlayerHealth = (value) => {
        vm.playerHealth = value;
    }

    vm.resetPlayer = () => {
        vm.playerHealth = 3
        vm.battles = 0;
    }
}

angular.module('app').service('PlayerService', PlayerService);