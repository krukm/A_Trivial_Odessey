'use strict';

const battleGround = {
    template: `
    <section class="battle__container">
        <section  class="battle__img__bg" ng-style="{'background-image':'url(' + $ctrl.battleImage + ')'}">
            <section class="timer__container">
                <section class="timer">
                    <p id="timer">{{ $ctrl.counter }} seconds left</p>
                    <button ng-click="$ctrl.timer(); $ctrl.getNextQuestion();
                    ">Start</button>
                </section>
                <section ng-hide="$ctrl.gameOver" class="section__health" id="id__health"></section>
            </section>
        </section>
        
        <section class="question__container">
            <section ng-show="$ctrl.gameOver" class="section__game-over">Game Over</section>
            <section ng-if="$ctrl.answered === false">
                <p class="trivia__question"> {{ $ctrl.currentQuestion }} </p>
                <section class="answers"> 
                    <div ng-repeat="answer in $ctrl.answerArray " ng-class="{'answered': $ctrl.answered}" >
                    <button ng-value="answer" ng-click="$ctrl.userChooseAnswer(answer); $ctrl.stopTimer();" ng-class="answer === $ctrl.correctAnswer ? 'correct' : 'incorrect'">
                        {{ answer }}
                    </button>
                    </div>
                </section>
            </section>
            <section class="text_container" ng-if="$ctrl.answered === true">
                <p class="answer_text">{{ $ctrl.answerText }}</p>
                <button ng-hide="$ctrl.gameOver" class="next_question_button" ng-click="$ctrl.nextQuestion(); $ctrl.timer();">{{ $ctrl.button }}</button>
            </section>
        </section>
    </section>    
    `,

    controller: ["TriviaService", "PlayerService", "$location", "$timeout", "$interval", "$scope", function(TriviaService, PlayerService, $location, $timeout, $interval, $scope) {
        const vm = this;
        vm.id = "id__health";
        vm.gameOver = false;
        vm.answerCounter = 0;
        vm.correctAnswers = 0;
        vm.incorrectAnswers = 0;
        vm.answered = false;
        vm.button = "Next Question";
        vm.counter = 30;
        vm.easyQuestions = [];
        vm.mediumQuestions = [];
        vm.hardQuestions = [];
        vm.answerArray = [];
        vm.currentQuestion = null;
        vm.correctAnswer = null;
            
        TriviaService.getEasyQuestions().then((response) => {
            vm.easyQuestions = response;
        });
        
        TriviaService.getMediumQuestions().then((response) => {
            vm.mediumQuestions = response;
        });
        
        TriviaService.getHardQuestions().then((response) => {
            vm.hardQuestions = response;
        });

        // vm.timer = () => {
        //     vm.counter = 30;
        //     vm.countDown = setInterval(function() {
        //         vm.counter--;
        //         $scope.$apply();
        //     }, 1000);

        //     return vm.countDown;
        // }

        // vm.stopTimer = () => {
        //     clearInterval(vm.countDown);
        //     $scope.$apply();
        //     vm.counter = 30;
        // }

        vm.getQuestion = (questionArray) => {
            vm.currentQuestion = questionArray[0].question;
            vm.correctAnswer = questionArray[0].correct_answer;

            vm.answerArray.push(vm.correctAnswer);
            for (let answer of questionArray[0].incorrect_answers) {
                vm.answerArray.push(answer);
            }
            vm.randomizeArray(vm.answerArray);
            console.log(questionArray);
            questionArray.shift();
        }

        vm.randomizeArray = (array) => {
            return array.sort(function(a, b) { return 0.5 - Math.random() });
        }

        vm.getNextQuestion = () => {
            vm.currentQuestion = null;
            vm.correctAnswer = null;
            vm.answerArray = [];

            if (PlayerService.battles < 3) {
                console.log(vm.easyQuestions);
                vm.getQuestion(vm.easyQuestions);
            } else if (PlayerService.battles >= 3 && PlayerService.battles < 6) {
                console.log(vm.mediumQuestions);
                vm.getQuestions(vm.mediumQuestions);
            } else if (PlayerService.battles >= 6) {
                console.log(vm.hardQuestions);
                vm.getQuestions(vm.hardQuestions);
            }
        }

        vm.userChooseAnswer = (hit) => {

            vm.answered = true;
            vm.answerCounter += 1;
            if (hit === vm.correctAnswer) {
                vm.answerText = "You answered correctly Great job!";
                vm.correctAnswers++;

                if (vm.correctAnswers === 2) {
                    PlayerService.setPlayerHealth(PlayerService.playerHealth += 1);
                }
            } else {
                vm.answerText = "You answered the question wrong! Try again!";
                vm.incorrectAnswers++;
                if (vm.incorrectAnswers === 2) {
                    PlayerService.setPlayerHealth(PlayerService.playerHealth -= 1);
                }
                if (PlayerService.playerHealth === 0) {
                    vm.gameOver = true;

                    $timeout(() => {
                        PlayerService.resetPlayer();
                        $location.path('/intro');
                    }, 5000);
                }
            }

            //vm.easyQuestions.splice(vm.randomIndex, 1);

            if (vm.answerCounter === 2) {
                vm.button = "Continue Story"
                PlayerService.battles += 1;
                if (PlayerService.battles > 8) {
                    $location.path("/victory");
                }
            }
        }

        vm.nextQuestion = () => {
            vm.answered = false;
            vm.getNextQuestion();
            if (vm.answerCounter === 2) {
                $location.path("/map");
            }
        }

        PlayerService.updateHealthDisplay(vm.id);

        switch (PlayerService.battles) {
            case 0:
                vm.battleImage = "./img/Underworld.png";
                break;
            case 1:
                vm.battleImage = "./img/Underworld.png";
                break;
            case 2:
                vm.battleImage = "./img/island.png";
                break;
            case 3:
                vm.battleImage = "./img/mountain-island.png"
                break;
            case 4:
                vm.battleImage = "./img/mountain-island.png"
                break;
            case 5:
                vm.battleImage = "/img/mountain-island.png"
                break;
            case 6:
                vm.battleImage = "/img/mountain-island.png"
                break;
            case 7:
                vm.battleImage = "/img/Olympus1.png"
                break;
            case 8:
                vm.battleImage = "/img/Olympus2.png"
                break;
        }
    }]
};


angular.module('app').component('battleGround', battleGround);