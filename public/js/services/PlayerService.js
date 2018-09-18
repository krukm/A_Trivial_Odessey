'use strict';

function PlayerService() {
    const vm = this;

    vm.playerHealth = 3;
    vm.battles = 0;
    vm.mapAudio = new Audio("public/sounds/map.mp3");
    vm.battleAudio = new Audio("public/sounds/battle.mp3");
    vm.awwAudio = new Audio("public/sounds/aww.mp3");
    vm.applauseAudio = new Audio("public/sounds/applause.mp3");
    vm.introAudio = new Audio("public/sounds/intro.mp3");

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