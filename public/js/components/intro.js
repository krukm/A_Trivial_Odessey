'use strict';

const intro = {
    template: `
    <section class = "intro_container">
    <img class="logo" src = "./img/logo2.png">
    <p class="intro_text">Zeus has banished you to the Underworld and capriciously imprisoned your loved ones at Mt. Olympus. The gods it seems have made you their plaything! They will move heaven and earth so that you don’t see your family again. Use your cunning, strength and bravery to defy the gods and foil their schemes.</p>
    <section class="button__intro--section">
        <button class="button__play" ng-click="$ctrl.play()">{{ $ctrl.playButton }}</button>
        <button class="button__instructions--intro" ng-click="$ctrl.instructions()">INSTUCTIONS</button>
    </section>
    </section>

    `,
    controller: ["$location", "PlayerService", function($location, PlayerService) {
        const vm = this;
        PlayerService.battles >= 0 ? PlayerService.introAudio.play() : console.log(`Not Playing`);
        
        PlayerService.battles > 0 ? vm.playButton = "CONTINUE" : vm.playButton = "PLAY";
        
        vm.play = () => {
            $location.url("/map");
            PlayerService.introAudio.pause();
        }
        
        vm.instructions = () => $location.url("/instructions");
    }]
}
angular.module('app').component('intro', intro);