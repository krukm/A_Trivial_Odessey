'use strict';

const victory = {
    template: `
    <section class="section__victory">
    <h1 class="h1__winner">YOU WIN!!!</h1>
    <button class="button__play-again" type="button" ng-click="resetGame();">Play again?</button>
    </section>
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