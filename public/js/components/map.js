'use strict';

const map = {
    template: `
    <section class="map__canvas">
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
                <p>Wow you gained an extra heart!</p>
                <p>Answer this question right and you can gain an extra heart!</p>
                <p>{{ $ctrl.question }}</p>
                <section class="answer__section">
                    <button class="answers" ng-click="$ctrl.evaluateAnswer(answer)" ng-repeat="answer in $ctrl.answers">{{ answer }}</button>
                </section>
                <button class="x__button" ng-click="$ctrl.hideInstructions()"><i class="fas fa-times"></i></button>
            </sectio>
        </section>
    </section>                            
    <section class="bottom__map--nav">
        <section>
            <button class="button__intro" ng-click="$ctrl.intro()">INTRO</button>
            <button class="button__instructions" ng-click="$ctrl.instructions()">INSTRUCTIONS</button>
            <button class="button__info" ng-click="$ctrl.info()">CHARACTER BIO'S</button>
        </section>
        <button class="skip__button" ng-click="$ctrl.skip()">SKIP</button>
    </section>   
    `,

    controller: ["PlayerService", "EnemyService", "TriviaService", "$location", "$timeout", "$interval", function(PlayerService, EnemyService, TriviaService, $location, $timeout, $interval) {

        const vm = this;
        vm.id = "id__health";
        vm.i = 0;
        vm.speed = 30;
        vm.fightButton = false;
        vm.canvas = document.querySelector('canvas');
        vm.canvas.width = 800;
        vm.canvas.height = 600;
        vm.gctx = vm.canvas.getContext("2d");
        vm.questions;
        vm.showInstructions = false;

        if (PlayerService.battles === 1) {
            vm.showInstructions = true;
            TriviaService.getEasyQuestions().then(() => {
                vm.questions = TriviaService.easyQuestions;
                console.log(vm.questions);
            }).then(() => {
                vm.getQuestion = () => {
                    vm.question = vm.questions[5].question;
                    vm.correct_answer = vm.questions[5].correct_answer;
                    vm.answers = vm.questions[5].incorrect_answers;
                    vm.answers.push(vm.correct_answer);
                }
            }).then(() => {
                vm.getQuestion();
                vm.evaluateAnswer = (answer) => {
                    if (answer === vm.correct_answer) {
                        console.log(`Right`);
                    } else {
                        console.log(`Wrong`);
                    }
                }
            });
        };
        
        vm.hideInstructions = () => vm.showInstructions = false;

        vm.fight = () => $location.url("/battle-ground");
        
        vm.intro = () => $location.url("/intro");

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

        vm.drawTwoLines = (startX, startY, middleX, middleY, endX, endY) => {
            vm.amount = 0;

            vm.startx = [startX, middleX];
            vm.starty = [startY, middleY];
            vm.endx = [middleX, endX];
            vm.endy = [middleY, endY];

            vm.drawLinesInterval = $interval(function() {
                if (vm.idx > vm.startx.length)
                    clearInterval(vm.drawLinesInterval);
            
                vm.linepercentage = 0;
                vm.idx++; //move onto the next line
                vm.animateInterval = $interval(function() {
                    vm.linepercentage += 0.01;
                    if(vm.linepercentage > 1) {
                        clearInterval(vm.animateInterval);
                    }
            
                    vm.context.strokeStyle = "red";
                    vm.context.setLineDash([5, 5]);
                    vm.context.lineWidth = 5;
                    vm.context.moveTo(vm.startx[vm.idx], vm.starty[vm.idx]);
                    vm.tempxend = 0;
                    vm.tempyend = 0;

                    if (vm.startx[vm.idx] > vm.endx[vm.idx]) {
                        vm.tempxend = vm.startx[vm.idx] - ((vm.startx[vm.idx] - vm.endx[vm.idx]) * vm.linepercentage);
                    } else {
                        vm.tempxend = vm.startx[vm.idx] + ((vm.endx[vm.idx] - vm.startx[vm.idx]) * vm.linepercentage);
                    }

                    if (vm.starty[vm.idx] > vm.endy[vm.idx]) {
                        vm.tempyend = vm.starty[vm.idx] - ((vm.starty[vm.idx] - vm.endy[vm.idx]) * vm.linepercentage);
                    } else {
                        vm.tempyend = vm.starty[vm.idx] + ((vm.endy[vm.idx] - vm.starty[vm.idx]) * vm.linepercentage);
                    }

                    vm.context.lineTo(vm.tempxend, vm.tempyend);
                    vm.context.stroke();
                }, 40);
            }, 2000);
        }

        switch (PlayerService.battles) {
            case 0:
                vm.storyText = EnemyService.cerberus;
                break;
            case 1:
                vm.storyText = EnemyService.hades;
                vm.draw(80, 470, 160, 365);
                break;
            case 2:
                vm.storyText = EnemyService.sirens;
                vm.context.moveTo(80, 470);
                vm.context.lineTo(160, 365);
                vm.context.stroke();
                //vm.draw(160, 365, 220, 260);
                vm.drawTwoLines(160, 365, 105, 345, 220, 260);
                break;
            case 3:
                vm.storyText = EnemyService.poseidon;
                vm.context.moveTo(80, 470);
                vm.context.lineTo(160, 365);
                vm.context.lineTo(220, 260);
                vm.context.stroke();
                vm.draw(220, 260, 45, 260);
                break;
            case 4:
                vm.storyText = EnemyService.achilles;
                vm.context.moveTo(80, 470);
                vm.context.lineTo(160, 365);
                vm.context.lineTo(220, 260);
                vm.context.lineTo(45, 260);
                vm.context.stroke();
                vm.draw(45, 260, 115, 195);
                break;
            case 5:
                vm.storyText = EnemyService.polyphemus;
                vm.context.moveTo(80, 470);
                vm.context.lineTo(160, 365);
                vm.context.lineTo(220, 260);
                vm.context.lineTo(45, 260);
                vm.context.lineTo(115, 195);
                vm.context.stroke();
                vm.draw(115, 195, 395, 330);
                break;
            case 6:
                vm.storyText = EnemyService.prometheus;
                vm.context.moveTo(80, 470);
                vm.context.lineTo(160, 365);
                vm.context.lineTo(220, 260);
                vm.context.lineTo(45, 260);
                vm.context.lineTo(115, 195);
                vm.context.lineTo(395, 330);
                vm.context.stroke();
                vm.draw(395, 330, 530, 540);
                break;
            case 7:
                vm.storyText = EnemyService.hercules;
                vm.gctx.moveTo(80, 470);
                vm.gctx.lineTo(160, 365);
                vm.gctx.lineTo(220, 260);
                vm.gctx.lineTo(45, 260);
                vm.gctx.lineTo(115, 195);
                vm.gctx.lineTo(395, 330);
                vm.gctx.lineTo(530, 540);
                vm.gctx.lineTo(730, 520);
                vm.gctx.stroke();
                vm.draw(730, 520, 740, 300);
                break;
            case 8:
                vm.storyText = EnemyService.zeus;
                vm.context.moveTo(80, 470);
                vm.context.lineTo(160, 365);
                vm.context.lineTo(220, 260);
                vm.context.lineTo(45, 260);
                vm.context.lineTo(115, 195);
                vm.context.lineTo(395, 330);
                vm.context.lineTo(530, 540);
                vm.context.lineTo(740, 300);
                vm.context.stroke();
                vm.draw(740, 300, 720, 240);
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

        // vm.context.strokeStyle = "red";
        //     vm.context.setLineDash([5, 5]);
        //     vm.context.lineWidth = 5;
        //     vm.context.lineDashOffset = -vm.offset
        //     vm.context.beginPath();
        //     //Cerebus
        //     vm.context.moveTo(80, 470);
        //     // Hades
        //     vm.context.lineTo(160, 365);
        //     // Sirens
        //     vm.context.lineTo(105, 345);
        //     vm.context.lineTo(220, 260);
        //     // Poseidon
        //     vm.context.lineTo(45, 260);
        //     // Athena
        //     vm.context.lineTo(115, 195);
        //     // Achilles
        //     vm.context.lineTo(300, 160);
        //     vm.context.lineTo(395, 330);
        //     // Cyclops
        //     vm.context.lineTo(530, 540);
        //     // Promethus
        //     vm.context.lineTo(730, 520);
        //     vm.context.lineTo(740, 300);
        //     // Mountain
        //     vm.context.lineTo(720, 240);
        //     // Zeus
        //     vm.context.lineTo(740, 55);
        //     vm.context.stroke();
    }]
}

angular.module('app').component('map', map);