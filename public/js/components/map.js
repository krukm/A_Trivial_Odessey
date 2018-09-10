'use strict';

const map = {
    template: `
    
    <section class="section__health" id="id__health"></section>
    <canvas></canvas>

        
    `,
    controller: ["PlayerService", function(PlayerService) {
        
        const vm = this;
        vm.id = "id__health";
        
        PlayerService.updateHealthDisplay(vm.id);
        
        vm.canvas = document.querySelector('canvas');
        vm.gctx = vm.canvas.getContext("2d");

        vm.gctx.fillRect(50, 50, 100, 100);
        console.log(canvas);

        // vm.gctx.beginpath();
        // vm.gctx.setLineDash([5,5]);
        // vm.gctx.lineDashOffset = 5;
        // vm.gctx.moveTo(0, 100);
        // vm.gctx.lineTo(400, 100);
        // vm.gctx.stroke();        
        
        // vm.canvas.width = window.innerWidth;
        // vm.canvas.height = window.innerHeight;

        // let background = new Image();
        // background.src = '/public/img/map.png';
        // background.onload = function() {
        //     vm.c.drawImage(background, 0, 0);
        // }
        // console.log(vm.canvas);
        
    }]
}

angular.module('app').component('map', map);