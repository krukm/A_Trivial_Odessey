'use strict';

const victory = {
    template: `
    <h1>YOU WIN!!!</h1>
    <button type="button" ng-click="resetGame();">Play again?</button>
    `,
    controller: ['$location', 'PlayerService', function ($location, PlayerService) {
        const vm = this;

        vm.resetGame = () => {
            PlayerService.resetPlayer();
            $location.path('/intro');
        }
    }]
}

angular.module('app').component('victory', victory);