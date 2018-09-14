'use strict';

const battleGround = {
    template: `
    <section class="battle__container">
        <section  class="battle__img__bg" ng-style="{'background-image':'url(' + $ctrl.battleImage + ')'}">
            <section class="timer__container">
                <section class="timer">
                    <p id="timer">{{ $ctrl.counter }} seconds left</p>
                </section>
                <section ng-hide="$ctrl.gameOver" class="section__health" id="id__health">
                    <player-health></player-health>
                </section>
            </section>
            <section ng-show="$ctrl.gameOver" class="section__game-over">Game Over</section>
            <img ng-src="{{ $ctrl.characterImage }}" class="battle__char__img">
            <section ng-hide="$ctrl.gameOver" class="question__container">
                <section ng-if="$ctrl.answered === false">
                    <p class="trivia__question"> {{ $ctrl.currentQuestion }} </p>
                    <section class="answers"  ng-class="{'answered': $ctrl.answered}" >
                        <button ng-repeat="answer in $ctrl.answerArray" ng-value="answer" ng-click="$ctrl.userChooseAnswer(answer); $ctrl.stopTimer();" ng-class="answer === $ctrl.correctAnswer ? 'correct' : 'incorrect'">
                            {{ answer }}
                        </button>
                    </section>
                </section>
                <section>
                    <button ng-if="$ctrl.start === false" class="start__button" ng-click="$ctrl.timer(); $ctrl.getNextQuestion();">Start</button>
                </section>
                <section class="text_container" ng-if="$ctrl.answered === true">
                    <p class="answer_text">{{ $ctrl.answerText }} <span ng-if="$ctrl.incorrect">{{ $ctrl.correctAnswer }}</span>!</p>
                    <button ng-hide=" $ctrl.switchButtons" class="next_question_button" ng-click="$ctrl.nextQuestion(); $ctrl.timer();">NEXT QUESTION</button>
                    <button ng-show="$ctrl.switchButtons" class="next_question_button" ng-click="$ctrl.continue();">CONTINUE</button>
                </section>
            </section>
        </section>
    </section>    
    `,

    controller: ["TriviaService", "PlayerService", "$location", "$timeout", "$interval", function(TriviaService, PlayerService, $location, $timeout, $interval) {
        const vm = this;
        vm.id = "id__health";
        vm.start = false;
        vm.gameOver = false;
        vm.incorrect = false;
        vm.switchButtons = false;
        vm.answerCounter = 0;
        vm.correctAnswers = 0;
        vm.incorrectAnswers = 0;
        vm.answered = false;
        vm.counter = 20;
        vm.answerArray = [];
        vm.currentQuestion = null;
        vm.correctAnswer = null;
        vm.changedHealth = false;
            

        if (PlayerService.battles === 0) {
            TriviaService.getEasyQuestions().then((response) => {
                vm.easyQuestions = response;
                sessionStorage.setItem("easy", JSON.stringify(vm.easyQuestions));
            });

            TriviaService.getMediumQuestions().then((response) => {
                vm.mediumQuestions = response;
                sessionStorage.setItem("medium", JSON.stringify(vm.mediumQuestions));
            });

            TriviaService.getHardQuestions().then((response) => {
                vm.hardQuestions = response;
                sessionStorage.setItem("hard", JSON.stringify(vm.hardQuestions));
            });
        }

        vm.easyQuestions = JSON.parse(sessionStorage.getItem("easy"));
        vm.mediumQuestions = JSON.parse(sessionStorage.getItem("medium"));
        vm.hardQuestions = JSON.parse(sessionStorage.getItem("hard"));

        vm.evaluateAnswerCounter = () => {
            if (vm.answerCounter === 2) {
                vm.button = "Continue Story"
                PlayerService.battles += 1;
                if (PlayerService.battles > 8) {
                    $location.path("/victory");
                }
            }
        }

        vm.timer = () => {
            vm.counter = 20;
            vm.countDown = $interval(function() {
                vm.counter--;

                if (vm.counter <= 0) {
                    $interval.cancel(vm.countDown);
                    vm.answerCounter++
                    console.log(vm.answerCounter);

                    vm.evaluateAnswerCounter();
                    
                    $timeout(function() {
                        vm.answered = true;
                        vm.correct = true;
                        vm.answerText = `You ran out of time. The correct answer was`;
                    }, 0);
                }
            }, 1000);

            return vm.countDown;
        }

        vm.stopTimer = () => {
            $interval.cancel(vm.countDown);
            vm.counter = 20;
        }

        vm.getQuestion = (questionArray) => {
            
            vm.currentQuestion = questionArray[0].question;
            vm.correctAnswer = questionArray[0].correct_answer;

            vm.answerArray.push(vm.correctAnswer);
            for (let answer of questionArray[0].incorrect_answers) {
                vm.answerArray.push(answer);
            }
            vm.randomizeArray(vm.answerArray);
            questionArray.shift();
            sessionStorage.setItem("easy", JSON.stringify(vm.easyQuestions));
            sessionStorage.setItem("medium", JSON.stringify(vm.mediumQuestions));
            sessionStorage.setItem("hard", JSON.stringify(vm.hardQuestions));
        }

        vm.randomizeArray = (array) => {
            return array.sort(function(a, b) { return 0.5 - Math.random() });
        }

        vm.getNextQuestion = () => {
            vm.start = true;
            vm.currentQuestion = null;
            vm.correctAnswer = null;
            vm.answerArray = [];

            if (PlayerService.battles < 3) {
                console.log('if < 3');
                console.log(vm.easyQuestions);
                vm.getQuestion(vm.easyQuestions);
            } else if (PlayerService.battles >= 3 && PlayerService.battles < 6) {
                console.log('if >=3 && < 6');
                console.log(vm.mediumQuestions);
                vm.getQuestion(vm.mediumQuestions);
            } else if (PlayerService.battles >= 6) {
                console.log('if >= 6');
                console.log(vm.hardQuestions);
                vm.getQuestion(vm.hardQuestions);
            }
        }

        vm.userChooseAnswer = (userSelection) => {
            vm.answered = true;
            vm.answerCounter += 1;

            if (userSelection === vm.correctAnswer) {
                vm.answerText = "You answered correctly. Great job";
                vm.correctAnswers++;

                if (vm.correctAnswers === 2) {
                    PlayerService.setPlayerHealth(PlayerService.playerHealth += 1);
                    vm.changedHealth = true;
                }

            } else {
                vm.incorrect = true;
                vm.answerText = `You answered the question incorrectly! The correct answer was`;
                vm.incorrectAnswers++;

                if (vm.incorrectAnswers === 2) {
                    PlayerService.setPlayerHealth(PlayerService.playerHealth -= 1);
                    vm.changedHealth = true;
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
                vm.switchButtons = true;
            }

            vm.evaluateAnswerCounter();
        }

        vm.nextQuestion = () => {
            vm.answered = false;
            vm.getNextQuestion();
        }

        vm.continue = () => {
            if (vm.changedHealth) {
                $location.path("/map").search({"updateHealth": "true"});
            } else {
                $location.path("/map");
            }
        }

        switch (PlayerService.battles) {
            case 0:
                vm.battleImage = "./img/Underworld.png";
                vm.characterImage = "./img/Cerebrus.png";
                break;
            case 1:
                vm.battleImage = "./img/Underworld2.png";
                vm.characterImage = "./img/Hades.png";
                break;
            case 2:
                vm.battleImage = "./img/island.png";
                vm.characterImage = "./img/Siren.png";
                break;
            case 3:
                vm.battleImage = "./img/mountain-island.png"
                vm.characterImage = "./img/Poseidon.png";
                break;
            case 4:
                vm.battleImage = "./img/beach.png"
                vm.characterImage = "./img/Athena.png";
                break;
            case 5:
                vm.battleImage = "./img/cave.png"
                vm.characterImage = "./img/Polyphemus.png";
                break;
            case 6:
                vm.battleImage = "./img/rocky.png"
                vm.characterImage = "./img/Achilles.png";
                break;
            case 7:
                vm.battleImage = "./img/Olympus1.png"
                vm.characterImage = "./img/Hercules.png";
                break;
            case 8:
                vm.battleImage = "./img/Olympus2.png"
                vm.characterImage = "./img/Zeus.png";
                break;
        }
    }]
};


angular.module('app').component('battleGround', battleGround);