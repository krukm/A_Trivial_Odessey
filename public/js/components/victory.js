'use strict';

const victory = {
    template: `
    <h1>YOU WIN!!!</h1>
    <button type="button" ng-click="resetGame();">Play again?</button>
    `,
    controller: ['$location', function ($location) {
        const vm = this;

        vm.resetGame = () => {
            $location.path('/intro');
        }
    }]
}

angular.module('app').component('victory', victory);