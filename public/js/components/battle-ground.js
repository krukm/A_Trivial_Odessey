'use strict';

const battleGround = {
    template: `
    <section class="battle__container">
        <section  class="battle__img__bg" ng-style="{'background-image':'url(' + $ctrl.battleImage + ')'}">
            <section class="timer__container">
                <section class="timer">
                    <p id="timer">{{ $ctrl.counter }} seconds left</p>
                    <button ng-click="$ctrl.timer()">Start</button>
                </section>
                <section ng-hide="$ctrl.gameOver" class="section__health" id="id__health"></section>
            </section>


            <section class="question__container">
                <section ng-show="$ctrl.gameOver" class="section__game-over">Game Over</section>
                <section ng-if="$ctrl.answered === false">
                    <p class="trivia__question"> {{ $ctrl.quizQuestion }} </p>
                    <section class="answers"> 
                        <div ng-repeat="answer in $ctrl.answers" ng-class="{'answered': $ctrl.answered}" >
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

        vm.timer = () => {
            vm.counter = 30;
            vm.countDown = setInterval(function() {
                vm.counter--;
                $scope.$apply();
            }, 1000);

            return vm.countDown;
        }
        switch (PlayerService.battles) {
            case 0:
                vm.battleImage = "./img/Underworld.png";
                break;
            case 1:
                vm.battleImage = "./img/Underworld2.png";
                break;
            case 2:
                vm.battleImage = "./img/island.png";
                break;
            case 3:
                vm.battleImage = "./img/mountain-island.png"
                break;
            case 4:
                vm.battleImage = "./img/beach.png"
                break;
            case 5:
                vm.battleImage = "./img/rocky.png"
                break;
            case 6:
                vm.battleImage = "./img/caves.png"
                break;
            case 7:
                vm.battleImage = "./img/Olympus1.png"
                break;
            case 8:
                vm.battleImage = "./img/Olympus2.png"
                break;
        }
        vm.stopTimer = () => {
            clearInterval(vm.countDown);
            $scope.$apply();
            vm.counter = 30;
        }

        PlayerService.updateHealthDisplay(vm.id);

        vm.getNextQuestion = () => {
            if (PlayerService.battles < 3) {
                TriviaService.getEasyQuestions().then((response) => {
                    vm.getQuestions(response);
                });
            } else if (PlayerService.battles >= 3 && PlayerService.battles < 6) {
                TriviaService.getMediumQuestions().then((response) => {
                    vm.getQuestions(response);
                });
            } else if (PlayerService.battles >= 6) {
                TriviaService.getHardQuestions().then((response) => {
                    vm.getQuestions(response);
                });
            }
        }

        vm.getNextQuestion();

        vm.getQuestions = (response) => {
            vm.questions = response.results;
            vm.randomIndex = Math.floor(Math.random() * vm.questions.length);
            vm.correctAnswer = response.results[vm.randomIndex].correct_answer;
            console.log(vm.correctAnswer);
            console.log(PlayerService.battles);
            vm.quizQuestion = response.results[vm.randomIndex].question;
            vm.answers = response.results[vm.randomIndex].incorrect_answers;
            vm.answers.push(response.results[vm.randomIndex].correct_answer);
            vm.answers.sort(function(a, b) { return 0.5 - Math.random() });
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
    }]
};


angular.module('app').component('battleGround', battleGround);