'use strict';

const map = {
    template: `
        <section class="section__health" id="id__health">

        </section>
    `,
    controller: ["PlayerService", function(PlayerService) {
        
        const vm = this;
        vm.heartImage = document.createElement("img");
        vm.heartImage.src = "/public/img/heart.png";
        
        vm.health = PlayerService.playerHealth;
        
        for (let i = 0; i < vm.health; i++) {
            document.getElementById("id__health").insertAdjacentHTML('afterbegin', '<img class="img__heart" src="/public/img/heart.png"></img>');
            console.log(vm.health);
        }


        
    }]
}

angular.module('app').component('map', map);