'use strict';

const map = {
    template: `
    <section class="map__canvas">
            <img class="logo__map" src='public/img/logo2.png'>
            <img src="{{ 'public/img/' + $ctrl.opponentOnMap + '.png' }}" id="img__canvas" style="{{$ctrl.showMonster?'display:block':'display:none'}}; left: {{$ctrl.monsterLeft}}; top: {{$ctrl.monsterTop}};" >

            <canvas id="canvas"></canvas>
        <section class="img__container">
            <section class="section__health" id="id__health">
                <player-health></player-health>
            </section>
            <section class="story__container">
                <p id="story" class="story"></p>
                <button ng-if="$ctrl.fightButton" ng-click="$ctrl.fight()" class="fight">fight!</button>
            </section>
        </section>
    </section>       
    <section class="popup">
        <section ng-if="$ctrl.showInstructions" class="heart__instructions">
            <section class="heart__question">
                <p ng-if="!$ctrl.showOutCome">{{ $ctrl.message }}</png>
                <p ng-if="!$ctrl.showOutCome">{{ $ctrl.message_2 }}</p>
                <p ng-if="!$ctrl.showOutCome">{{ $ctrl.question }}</p>
                <section ng-if="!$ctrl.showOutCome" class="answer__section">
                    <button class="answers" ng-click="$ctrl.evaluateAnswer(answer)" ng-repeat="answer in $ctrl.answers">{{ answer }}</button>
                </section>
                <p class="out_come" ng-class="{'correct__map':$ctrl.correct, 'incorrect__map':$ctrl.incorrect}" ng-if="$ctrl.showOutCome">{{ $ctrl.message_3 }}</p>
                <button class="x__button" ng-click="$ctrl.hideInstructions()"><i class="fas fa-times"></i></button>
            </section>
        </section>
    </section>                            
    <section class="bottom__map--nav">
        <section class="bottom__map--buttons">
            <button class="button__intro" ng-click="$ctrl.intro()">INTRO</button>
            <button class="button__instructions" ng-click="$ctrl.instructions()">INSTRUCTIONS</button>
            <button class="button__info" ng-click="$ctrl.info()">CHARACTER BIO'S</button>
        </section>
        <button class="skip__button" ng-click="$ctrl.skip()">SKIP</button>
    </section>   
    `,

    controller: ["PlayerService", "EnemyService", "$location", "$timeout", "$interval", function(PlayerService, EnemyService, $location, $timeout, $interval) {

        const vm = this;
        vm.id = "id__health";
        vm.i = 0;
        vm.speed = 20;
        vm.fightButton = false;
        vm.canvas = document.querySelector('canvas');
        vm.canvas.width = 800;
        vm.canvas.height = 600;
        vm.gctx = vm.canvas.getContext("2d");
        vm.questions;
        vm.showInstructions = false;
        vm.showOutCome = false;
        vm.correct = false;
        vm.incorrect = false;
        vm.opponentOnMap = "";
        vm.showMonster = false;
        vm.monsterTop = "";
        vm.monsterLeft = "";
        
        PlayerService.battles >= 0 ? PlayerService.mapAudio.play() : console.log(`Not Playing`);
        PlayerService.mapAudio.loop;

        vm.questionObj = {
            question: "In most traditions, who was the wife of Zeus?",
            incorrect_answers: ["Aphrodite", "Athena", "Hestia"],
            correct_answer: "Hera"
        }

        vm.question = vm.questionObj.question;
        vm.correctAnswer = vm.questionObj.correct_answer;
        vm.answers = vm.questionObj.incorrect_answers;
        vm.answers.push(vm.correctAnswer);
        vm.opponentOnMap = "";
        vm.showMonster = false;
        vm.monsterTop = "";
        vm.monsterLeft = "";


        if (PlayerService.battles === 1) {
            vm.showInstructions = true;
            if (PlayerService.playerHealth < 3) {
                vm.message = "Did you notice you lost a heart?";
                vm.message_2 = "Answer this question right and you can get your heart back!";
            } else if (PlayerService.playerHealth > 3) {
                vm.message = "Did you notice you gained a heart?";
                vm.message_2 = "Answer this question right and you can get an extra one!";
            } else {
                vm.message = "Did you notice you still have 3 hearts?";
                vm.message_2 = "Answer this queston right and you can get an extra one!";
            }
        };

        vm.evaluateAnswer = answer => {
            if (answer === vm.correctAnswer) {
                PlayerService.applauseAudio.play();
                vm.showOutCome = true;
                vm.correct = true;
                PlayerService.setPlayerHealth(PlayerService.playerHealth += 1);
                vm.message_3 = "Yay, You Gained an extra heart. Don't lose them all or you'll die!";
                console.log(`Player health: ${PlayerService.playerHealth}`);
            } else {
                PlayerService.awwAudio.play();
                vm.showOutCome = true;
                vm.incorrect = true;
                vm.message_3 = "Oh no, You answered wrong, don't loose all your hearts or you'll die!";
            }
        }
        
        vm.hideInstructions = () => {
            vm.showInstructions = false;
            PlayerService.awwAudio.pause();
            PlayerService.applauseAudio.pause();
        }

        vm.fight = () => {
            $location.url("/battle-ground");
            PlayerService.mapAudio.pause();
        }

        vm.intro = () => {
            $location.url("/intro");
            PlayerService.mapAudio.pause();
        }

        vm.instructions = () => $location.url('/instructions');

        vm.info = () => $location.url('/characters');

        vm.skip = () => {
            vm.fightButton = true;
            vm.speed = 0;
        }

        vm.draw = (startX, startY, endX, endY) => {
            vm.amount = 0;
            $interval(() => {
                vm.amount += 0.01; // change to alter duration
                if (vm.amount > 1) vm.amount = 1;
                vm.gctx.clearRect(0, 0, vm.canvas.width, vm.canvas.height);
                vm.gctx.strokeStyle = "red";
                vm.gctx.setLineDash([5, 5]);
                vm.gctx.lineWidth = 5;
                vm.gctx.moveTo(startX, startY);
                vm.gctx.lineTo(startX + (endX - startX) * vm.amount, startY + (endY - startY) * vm.amount);
                vm.gctx.stroke();
            }, 50);
        }

        switch (PlayerService.battles) {
            case 0:
                vm.storyText = EnemyService.cerberus;

                vm.showMonster = true;
                vm.monsterLeft = "60px";
                vm.monsterTop = "440px";
                vm.opponentOnMap = "Cerebrus"
                // vm.logoImg = new Image();
                // vm.logoImg.src = "./img/Cerebrus.png";
                // vm.logoImg.onload = function () {
                //     vm.gctx.drawImage(vm.logoImg, 50, 430, 70, 70);
                // }
                break;
            case 1:
                vm.storyText = EnemyService.hades;
                vm.showMonster = true;
                vm.opponentOnMap = "Hades";
                vm.monsterLeft = "133px";
                vm.monsterTop = "305px";
                
                // vm.logoImg = new Image();
                // vm.logoImg.src = "./img/Hades.png";
                // vm.logoImg.onload = function () {
                //     vm.gctx.drawImage(vm.logoImg, 125, 325, 70, 70);
                // }

                vm.draw(80, 470, 160, 365);
                break;
            case 2:
                vm.storyText = EnemyService.sirens;
                vm.showMonster = true;
                vm.opponentOnMap = "Siren";
                vm.monsterLeft = "190px";
                vm.monsterTop = "205px";
                // vm.draw(160, 365, 220, 260);
                // vm.logoImg = new Image();
                // vm.logoImg.src = "./img/siren-assets/siren.png";
                // vm.logoImg.onload = function () {
                //     vm.gctx.drawImage(vm.logoImg, 180, 215, 70, 70);
                // }
                vm.gctx.moveTo(80, 470);
                vm.gctx.lineTo(160, 365);
                vm.gctx.stroke();
                vm.draw(160, 365, 220, 260);

                break;
            case 3:
                // vm.logoImg = new Image();
                // vm.logoImg.src = "./img/poseidon.png";
                // vm.logoImg.onload = function () {
                //     vm.gctx.drawImage(vm.logoImg, 10, 215, 70, 70);
                // }

                vm.storyText = EnemyService.poseidon;
                vm.showMonster = true;
                vm.opponentOnMap = "Poseidon";
                vm.monsterLeft = "20px";
                vm.monsterTop = "200px";
                vm.gctx.moveTo(80, 470);
                vm.gctx.lineTo(160, 365);
                vm.gctx.bezierCurveTo(160, 365, 10, 350, 220, 260);
                vm.gctx.stroke();
                vm.draw(220, 260, 45, 260);
                break;
            case 4:

                vm.storyText = EnemyService.achilles;
                // vm.logoImg = new Image();
                // vm.logoImg.src = "./img/athena.png";
                // vm.logoImg.onload = function () {
                //     vm.gctx.drawImage(vm.logoImg, 75, 150, 70, 70);
                // }
                vm.showMonster = true;
                vm.opponentOnMap = "Athena";
                vm.monsterLeft = "90px";
                vm.monsterTop = "130px";
                vm.gctx.moveTo(80, 470);
                vm.gctx.lineTo(160, 365);
                vm.gctx.bezierCurveTo(160, 365, 10, 350, 220, 260);
                vm.gctx.lineTo(45, 260);
                vm.gctx.stroke();
                vm.draw(45, 260, 115, 195);
                break;
            case 5:

                // vm.logoImg = new Image();
                // vm.logoImg.src = "./img/achilles.png";
                // vm.logoImg.onload = function () {
                //     vm.gctx.drawImage(vm.logoImg, 370, 280, 70, 70);
                // }

                vm.storyText = EnemyService.polyphemus;
                vm.showMonster = true;
                vm.opponentOnMap = "Achilles";
                vm.monsterLeft = "365px";
                vm.monsterTop = "270px";
                vm.gctx.moveTo(80, 470);
                vm.gctx.lineTo(160, 365);
                vm.gctx.bezierCurveTo(160, 365, 10, 350, 220, 260);
                vm.gctx.lineTo(45, 260);
                vm.gctx.lineTo(115, 195);
                vm.gctx.stroke();
                vm.draw(115, 195, 395, 330);
                break;
            case 6:

                // vm.logoImg = new Image();
                // vm.logoImg.src = "./img/polyphemus.png";
                // vm.logoImg.onload = function () {
                //     vm.gctx.drawImage(vm.logoImg, 500, 480, 70, 70);
                // }

                vm.storyText = EnemyService.prometheus;
                vm.showMonster = true;
                vm.opponentOnMap = "Polyphemus";
                vm.monsterLeft = "510px";
                vm.monsterTop = "475px";
                vm.gctx.moveTo(80, 470);
                vm.gctx.lineTo(160, 365);
                vm.gctx.bezierCurveTo(160, 365, 10, 350, 220, 260);
                vm.gctx.lineTo(45, 260);
                vm.gctx.lineTo(115, 195);
                vm.gctx.bezierCurveTo(115, 195, 300, 20, 395, 330)
                vm.gctx.stroke();
                vm.draw(395, 330, 530, 540);
                break;
            case 7:

            // vm.logoImg = new Image();
            // vm.logoImg.src = "./img/warrior.png";
            // vm.logoImg.onload = function () {
            //     vm.gctx.drawImage(vm.logoImg, 700, 480, 70, 70);
            // }

                vm.storyText = EnemyService.hercules;
                vm.showMonster = true;
                vm.opponentOnMap = "Warrior";
                vm.monsterLeft = "710px";
                vm.monsterTop = "460px";
                vm.gctx.moveTo(80, 470);
                vm.gctx.lineTo(160, 365);
                vm.gctx.bezierCurveTo(160, 365, 10, 350, 220, 260);
                vm.gctx.lineTo(45, 260);
                vm.gctx.lineTo(115, 195);
                vm.gctx.bezierCurveTo(115, 195, 350, 20, 395, 330)
                vm.gctx.lineTo(530, 540);
                vm.gctx.stroke();
                vm.draw(530, 540, 730, 520);
                break;
            case 8:

            // vm.logoImg = new Image();
            // vm.logoImg.src = "./img/zeus.png";
            // vm.logoImg.onload = function () {
            //     vm.gctx.drawImage(vm.logoImg, 705, 240, 70, 70);
            // }

                vm.storyText = EnemyService.zeus;
                vm.showMonster = true;
                vm.opponentOnMap = "Zeus";
                vm.monsterLeft = "740px";
                vm.monsterTop = "55px";
                vm.gctx.moveTo(80, 470);
                vm.gctx.lineTo(160, 365);
                vm.gctx.bezierCurveTo(160, 365, 10, 350, 220, 260);
                vm.gctx.lineTo(45, 260);
                vm.gctx.lineTo(115, 195);
                vm.gctx.bezierCurveTo(115, 195, 350, 20, 395, 330)
                vm.gctx.lineTo(530, 540);
                vm.gctx.lineTo(730, 520);
                vm.gctx.stroke();
                vm.draw(730, 520, 740, 55);
             // vm.draw(740, 300, 740, 55);
                break;
        }

        vm.typeWriter = () => {
            if (vm.i < vm.storyText.length) {
                document.getElementById("story").innerHTML += vm.storyText.charAt(vm.i);
                vm.i++;
                $timeout(vm.typeWriter, vm.speed);
            } else {
                vm.fightButton = true;
            }
        }

        vm.typeWriter();
    }]
}
angular.module('app').component('map', map);