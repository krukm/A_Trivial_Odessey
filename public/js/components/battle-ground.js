'use strict';

const battleGround = {
    template: `
    <section class="section__health" id="id__health"></section>
    <section class="question__container">
        <div><img class="zues" src="./img/zues.png"></div>
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
            <button class="next_question_button" ng-click="$ctrl.nextQuestion()">Next Question</button>
        </section>
    </section>

    
    
    <footer>

    </footer>
    `,

    controller: ["TriviaService", "PlayerService", "$location", function(TriviaService, PlayerService, $location) {
        const vm = this;
        vm.id = "id__health";
        vm.answerCounter = 0;
        vm.CorrectAnswers = 0;
        vm.IncorrectAnswers = 0;
        vm.answered = false;

        PlayerService.updateHealthDisplay(vm.id);

        // vm.getEasyTriviaQuestions = () => {
        TriviaService.getEasyQuestions().then((response) => {
            vm.questions = response.results;
            vm.randomIndex = Math.floor(Math.random() * vm.questions.length);
            vm.correctAnswer = response.results[vm.randomIndex].correct_answer;
            vm.quizQuestion = response.results[vm.randomIndex].question;
            vm.quizQuestion.replace(/[^a-zA-Z ]/g, "");
            vm.answers = response.results[vm.randomIndex].incorrect_answers;
            vm.answers.push(response.results[vm.randomIndex].correct_answer);
            // let array2 = [];
            // while (vm.answers.length !== 0) {
            //   let randomIndex = Math.floor(Math.random() * vm.answers.length);
            //   array2.push(vm.answers[randomIndex]);
            //   vm.answers.splice(randomIndex, 1);
            // }
            // vm.answers = array2;
            vm.answers.sort(function(a, b) { return 0.5 - Math.random() });

            console.log(vm.questions);
        });
            // }

        // vm.getAnotherQuestion = () => {

        // }

        vm.userChooseAnswer = (hit) => {
            console.log(hit);
            vm.answered = true;
            vm.answerCounter += 1;
            if (hit === vm.correctAnswer) {
                vm.answerText = "You answered correctly Great job!";
                vm.CorrectAnswers++;
                if (vm.answerCounter === 2) {
                    PlayerService.battles += 1;
                    if (PlayerService.battles === 3) {
                        console.log(`move to medium difficulty`);
                    }
                    if (vm.CorrectAnswers === 2) {
                        PlayerService.setPlayerHealth(PlayerService.playerHealth += 1);
                        vm.CorrectAnswers = 0;
                    }
                }
                console.log(`Player health: ${PlayerService.playerHealth}, Correct Answer: ${vm.CorrectAnswers}`);
            } else {
                vm.answerText = "You answered the question wrong! Try again!";
                vm.IncorrectAnswers++;
                if (vm.IncorrectAnswers === 2) {
                    PlayerService.setPlayerHealth(PlayerService.playerHealth -= 1);
                    vm.IncorrectAnswers = 0;
                }
                console.log(`Player health: ${PlayerService.playerHealth}, Incorrect Answer: ${vm.IncorrectAnswers}`);
            }
        }

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

                console.log(`Length of array ${vm.questions.length}`);
                console.log(`Random index is ${vm.randomIndex}`);
            })
        }



        vm.getMediumTriviaQuestions = () => {
            TriviaService.getMediumQuestions().then((response) => {
                console.log(response);
            });
        }
        vm.getHardTriviaQuestions = () => {
            TriviaService.getHardQuestions().then((response) => {
                console.log(response);
            });
        }
    }]
};


angular.module('app').component('battleGround', battleGround);