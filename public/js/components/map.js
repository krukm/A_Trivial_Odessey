'use strict';

const map = {
    template: `
        
        <section class="section__health" id="id__health"></section>
       
    `,
    controller: ["PlayerService", function(PlayerService) {
        
        const vm = this;
        vm.id = "id__health";
        //vm.canvas = document.querySelector('canvas');

        PlayerService.updateHealthDisplay(vm.id);

        //vm.canvas.width = window.innerWidth;
        //vm.canvas.height = window.innerHeight;
        //console.log(vm.canvas);
        
    }]
}

angular.module('app').component('map', map);