'use strict';

function PlayerService () {
    const vm = this;
    vm.playerHealth = 3;

    vm.resetPlayer = () => {
        vm.playerHealth = 3;
    }
}

angular.module('app').service('PlayerService', PlayerService);