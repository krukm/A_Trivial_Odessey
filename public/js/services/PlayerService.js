'use strict';

function PlayerService() {
    const vm = this;

    vm.playerHealth = 3;
    vm.battles = 0;
    vm.mapAudio = new Audio("./sounds/map.mp3");
    vm.battleAudio = new Audio("./sounds/battle.mp3");
    vm.awwAudio = new Audio("./sounds/aww.mp3");
    vm.applauseAudio = new Audio("./sounds/applause.mp3");
    vm.introAudio = new Audio("./sounds/intro.mp3");

    vm.getPlayerHealth = () => {
        return vm.playerHealth;
    }

    vm.setPlayerHealth = value => {
        vm.playerHealth = value;
    }

    vm.resetPlayer = () => {
        vm.playerHealth = 3
        vm.battles = 0;
    }
}
angular.module('app').service('PlayerService', PlayerService);