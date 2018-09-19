'use strict';

const victory = {
    template: `
    <section class="section__victory">
        <h1 class="h1__winner">YOU WIN!!!</h1>
        <section class="section__wide-scroll">
            <p class="p__credits" id="id__credits">{{ $ctrl.storyText }}</p>   
        </section>
        <button class="button__play-again" type="button" ng-click="$ctrl.resetGame();">PLAY AGAIN?</button>
    </section>
    <section class="portrait"><h1>!!!This game is intended for landscape only - please rotate to play!!!</h1></section>
    `,
    controller: ['$location', 'PlayerService', "$timeout", function($location, PlayerService, $timeout) {
        const vm = this;
        vm.i = 0;

        PlayerService.victory.play();
        PlayerService.mapAudio.pause();
        PlayerService.battleAudio.pause();

        vm.resetGame = () => {
            PlayerService.resetPlayer();
            $location.path('/intro');
        }

        vm.storyText = "You've completed your quest! The gods stood no chance before your awesome might. You delight in your family's reunion, and look to the horizon...";
    }]
}
angular.module('app').component('victory', victory);