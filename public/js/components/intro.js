'use strict';

const intro = {
    template: `
    <section> 
    <p>Zeus has banished you to the Underworld and capriciously imprisoned your loved ones at Mt. Olympus. The gods it seems have made you their plaything! They will move heaven and earth so that you will never see your family again! Use your cunning, strength and bravery to defy the gods and foil their schemes.</p>
    <button ng-click = "">START</button>
    </section>
    
    `,
    controller: function() {
        const vm = this;



    }
}

angular.module('app').component('intro', intro);