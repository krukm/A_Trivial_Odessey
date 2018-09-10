'use strict';

function PlayerService () {
    const vm = this;
    let playerHealth = 3;

    vm.resetPlayer = () => {
        playerHealth = 3;
    }
}

angular.module('app').service('PlayerService', PlayerService);