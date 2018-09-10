'use strict';

const intro = {
    template: `
    <section class = "intro_container">
    <p class="intro_text">Zeus has banished you to the Underworld and capriciously imprisoned your loved ones at Mt. Olympus. The gods it seems have made you their plaything! They will move heaven and earth so that you don’t see your family again. Use your cunning, strength and bravery to defy the gods and foil their schemes.</p>
    <button ng-click = "$ctrl.play()">PLAY</button>
    </section>

    `,
    controller: ["$location", function($location) {
        const vm = this;
        vm.play = () => {
            $location.url("/battle-ground");
        }

    }]
}

angular.module('app').component('intro', intro);