'use strict';

const battleGround = {
    template: `
    <section ng-hide="$ctrl.gameOver" class="section__health" id="id__health"></section>
    <section class="question__container">
        <section ng-show="$ctrl.gameOver" class="section__game-over">Game Over</section>
        <img class="img__battle-ground__back-ground" src="./img/island.png">
        <section ng-if="$ctrl.answered === false">
            <p class="trivia__question"> {{ $ctrl.quizQuestion }} </p>
            <section class="answers"> 
                <div ng-repeat="answer in $ctrl.answers" ng-class="{'answered': $ctrl.answered}" >
                <button ng-value="answer" ng-click="$ctrl.userChooseAnswer(answer)" ng-class="answer === $ctrl.correctAnswer ? 'correct' : 'incorrect'">
                    {{ answer }}
                </button>
                </div>
            </section>
        </section>
        <section class="text_container" ng-if="$ctrl.answered === true">
            <p class="answer_text">{{ $ctrl.answerText }}</p>
            <button ng-hide="$ctrl.gameOver" class="next_question_button" ng-click="$ctrl.nextQuestion()">{{ $ctrl.button }}</button>
        </section>
    </section>
    `,

    controller: ["TriviaService", "PlayerService", "$location", "$timeout", function(TriviaService, PlayerService, $location, $timeout) {
        const vm = this;
        vm.id = "id__health";
        vm.gameOver = false;
        vm.answerCounter = 0;
        vm.CorrectAnswers = 0;
        vm.IncorrectAnswers = 0;
        vm.answered = false;
        vm.button = "Next Question";

        PlayerService.updateHealthDisplay(vm.id);

        console.log('PlayerService.battles: ' + PlayerService.battles);
        console.log('gameOver: ' + vm.gameOver);

        if (PlayerService.battles <= 3) {
            console.log('Easy questions loading');
            TriviaService.getEasyQuestions().then((response) => {
                vm.questions = response.results;
                vm.randomIndex = Math.floor(Math.random() * vm.questions.length);
                vm.correctAnswer = response.results[vm.randomIndex].correct_answer;
                vm.quizQuestion = response.results[vm.randomIndex].question;
                vm.answers = response.results[vm.randomIndex].incorrect_answers;
                vm.answers.push(response.results[vm.randomIndex].correct_answer);
                vm.answers.sort(function(a, b) { return 0.5 - Math.random() });
            });
        } else if (PlayerService.battles >= 3 && PlayerService.battles <= 6) {
            console.log('Medium Questions loading');
            TriviaService.getMediumQuestions().then((response) => {
                vm.questions = response.results;
                vm.randomIndex = Math.floor(Math.random() * vm.questions.length);
                vm.correctAnswer = response.results[vm.randomIndex].correct_answer;
                vm.quizQuestion = response.results[vm.randomIndex].question;
                vm.answers = response.results[vm.randomIndex].incorrect_answers;
                vm.answers.push(response.results[vm.randomIndex].correct_answer);
                vm.answers.sort(function(a, b) { return 0.5 - Math.random() });
            });
        } else if (PlayerService.battles >= 7) {
            TriviaService.getHardQuestions().then((response) => {
                console.log('Hard questions loading');
                vm.questions = response.results;
                vm.randomIndex = Math.floor(Math.random() * vm.questions.length);
                vm.correctAnswer = response.results[vm.randomIndex].correct_answer;
                vm.quizQuestion = response.results[vm.randomIndex].question;
                vm.answers = response.results[vm.randomIndex].incorrect_answers;
                vm.answers.push(response.results[vm.randomIndex].correct_answer);
                vm.answers.sort(function(a, b) { return 0.5 - Math.random() });
            });
        }

        vm.userChooseAnswer = (hit) => {
                vm.answered = true;
                vm.answerCounter += 1;

                if (vm.answerCounter === 2) {
                    vm.button = "Continue Story"
                    PlayerService.battles += 1;
                }

                if (hit === vm.correctAnswer) {
                    vm.answerText = "You answered correctly Great job!";
                    vm.CorrectAnswers++;

                    if (vm.CorrectAnswers === 2) {
                        PlayerService.setPlayerHealth(PlayerService.playerHealth += 1);
                        vm.CorrectAnswers = 0;
                    }
                } else {
                    vm.answerText = "You answered the question wrong! Try again!";
                    vm.IncorrectAnswers++;

                    if (vm.IncorrectAnswers === 2) {
                        PlayerService.setPlayerHealth(PlayerService.playerHealth -= 1);
                        vm.IncorrectAnswers = 0;
                        console.log('Player Health: ' + PlayerService.playerHealth);
                    }
                    console.log(`Player health: ${PlayerService.playerHealth}, Incorrect Answer: ${vm.IncorrectAnswers}`);
                    if (PlayerService.playerHealth === 0) {
                        console.log('game over');
                        vm.gameOver = true;

                        $timeout(() => {
                            PlayerService.resetPlayer();
                            $location.path('/intro');
                        }, 5000);
                    }
                }
            }
            // console.log(`Player health: ${PlayerService.playerHealth}, Correct Answer: ${vm.CorrectAnswers}`);



        vm.nextQuestion = () => {
            TriviaService.getEasyQuestions().then((response) => {
                vm.answered = false;
                vm.questions = response.results;
                vm.randomIndex = Math.floor(Math.random() * vm.questions.length);

                vm.correctAnswer = response.results[vm.randomIndex].correct_answer;
                vm.quizQuestion = response.results[vm.randomIndex].question;
                vm.answers = response.results[vm.randomIndex].incorrect_answers;
                vm.answers.push(response.results[vm.randomIndex].correct_answer);

                vm.answers.sort(function(a, b) { return 0.5 - Math.random() });

                if (vm.answerCounter === 2) {
                    $location.path("/map");
                }
            })
        }

        vm.getEasyTriviaQuestions = () => {

        }

        vm.getMediumTriviaQuestions = () => {
            TriviaService.getMediumQuestions().then((response) => {});
        }
        vm.getHardTriviaQuestions = () => {
            TriviaService.getHardQuestions().then((response) => {});
        }

    }]
};


angular.module('app').component('battleGround', battleGround);