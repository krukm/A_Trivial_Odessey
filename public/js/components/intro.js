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

        // Find matches
        vm.mql = window.matchMedia("(orientation: portrait)");

        // If there are matches, we're in portrait
        if (vm.mql.matches) {
            // Portrait orientation
        } else {
            // Landscape orientation
        }

        // Add a media query change listener
        vm.mql.addListener(function(m) {
            if (m.matches) {
                // Changed to portrait
            } else {
                // Changed to landscape
            }
        });


        vm.audio = new Audio("./sounds/intro.mp3");

        PlayerService.battles >= 0 ? vm.audio.play() : console.log(`Not Playing`);

        PlayerService.battles > 0 ? vm.playButton = "CONTINUE" : vm.playButton = "PLAY";

        vm.play = () => {
            $location.url("/map");
            vm.audio.pause();
        }

        vm.instructions = () => $location.url("/instructions");


    }]
}
angular.module('app').component('intro', intro);