'use strict';

function PlayerService() {
    const vm = this;
    vm.battles = 0;
    let playerHealth = 3;


    vm.resetPlayer = () => {
        playerHealth = 3;
        vm.battles = 0;
    }
}

angular.module('app').service('PlayerService', PlayerService);