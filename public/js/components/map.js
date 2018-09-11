'use strict';

const map = {
    template: `
    <section class="map__canvas">
        <canvas id="canvas"></canvas>
        <section class="img__container">
            <section class="section__health" id="id__health"></section>
            <section class="story__container">
                <p id="story" class="story"></p>
            </section>
        </section>
    </section>   
            `,

    // 
    // <img id="map__bg" src="/public/img/map.png">
    controller: ["PlayerService", "EnemyService", function(PlayerService, EnemyService) {

        const vm = this;
        vm.id = "id__health";
        vm.i = 0;
        vm.speed = 40;
        PlayerService.updateHealthDisplay(vm.id);

        switch (PlayerService.battles) {
            case 0:
                vm.storyText = EnemyService.cerberus;
                break;
            case 1:
                vm.storyText = EnemyService.hades;
                break;
            case 2:
                vm.storyText = EnemyService.sirens;
                break;
            case 3:
                vm.storyText = EnemyService.poseidon;
                break;
            case 4:
                vm.storyText = EnemyService.achilles;
                break;
            case 5:
                vm.storyText = EnemyService.polyphemus;
                break;
            case 6:
                vm.storyText = EnemyService.prometheus;
                break;
            case 7:
                vm.storyText = EnemyService.hercules;
                break;
            case 8:
                vm.storyText = EnemyService.zeus;
                break;
        }

        vm.typeWriter = () => {
            if (vm.i < vm.storyText.length) {
                document.getElementById("story").innerHTML += vm.storyText.charAt(vm.i);
                vm.i++;
                setTimeout(vm.typeWriter, vm.speed);
            }
        }
        vm.typeWriter();

        vm.draw = () => {
            vm.canvas = document.querySelector('canvas');
            vm.gctx = vm.canvas.getContext("2d");
            vm.canvas.width = 800;
            vm.canvas.height = 600;
            vm.offset = 0;

            vm.gctx.strokeStyle = "red";
            vm.gctx.setLineDash([5, 5]);
            vm.gctx.lineWidth = 5;
            vm.gctx.lineDashOffset = -vm.offset
            vm.gctx.beginPath();
            //Cerebus
            vm.gctx.moveTo(80, 470);
            // Hades
            vm.gctx.lineTo(160, 365);
            // Sirens
            vm.gctx.lineTo(105, 345);
            vm.gctx.lineTo(220, 260);
            // Poseidon
            vm.gctx.lineTo(45, 260);
            // Athena
            vm.gctx.lineTo(115, 195);
            // Achilles
            vm.gctx.lineTo(300, 160);
            vm.gctx.lineTo(395, 330);
            // Cyclops
            vm.gctx.lineTo(530, 540);
            // Promethus
            vm.gctx.lineTo(730, 520);
            vm.gctx.lineTo(740, 300);
            // Mountain
            vm.gctx.lineTo(720, 240);
            // Zeus
            vm.gctx.lineTo(740, 55);
            vm.gctx.stroke();
        }

        function march() {
            vm.offset++;
            if (vm.offset > 16) {
                vm.offset = 0;
            }
            vm.draw();
            setTimeout(march, 20);
        }
        march();


    }]
}

angular.module('app').component('map', map);