'use strict';

const battleGround = {
    template: `
    <section class="question__container">
        <div><img class="zues" src="./img/zues.png"></div>
        <p class="trivia__question"> {{ $ctrl.quizQuestion }} </p>
        <form class="answers"> 
            <div ng-repeat="answer in $ctrl.answers" ng-class="{'answered': $ctrl.answered}" >
            <button ng-value="answer" ng-click="$ctrl.userChooseAnswer(answer)" ng-class="answer === $ctrl.correctAnswer ? 'correct' : 'incorrect'">
                {{ answer }}
            </button>
            </div>
        </from>
    </section>

    <button ng-click="$ctrl.nextQuestion()">Next Question</button>
    
    <footer>

    </footer>
    `,

    controller: ["TriviaService", "PlayerService", function(TriviaService, PlayerService) {
        const vm = this;
        vm.answerCounter = 0;
        vm.answered = false;

        // vm.getEasyTriviaQuestions = () => {
        TriviaService.getEasyQuestions().then((response) => {
                vm.questions = response.results;
                vm.correctAnswer = response.results[0].correct_answer;
                vm.quizQuestion = response.results[0].question;
                vm.answers = response.results[0].incorrect_answers;
                vm.answers.push(response.results[0].correct_answer);
                // let array2 = [];
                // while (vm.answers.length !== 0) {
                //   let randomIndex = Math.floor(Math.random() * vm.answers.length);
                //   array2.push(vm.answers[randomIndex]);
                //   vm.answers.splice(randomIndex, 1);
                // }
                // vm.answers = array2;
                vm.answers.sort(function(a, b) { return 0.5 - Math.random() });

                console.log(vm.answers);
            })
            // }

        // vm.getAnotherQuestion = () => {

        // }

        vm.userChooseAnswer = (hit) => {
            console.log(hit);
            vm.answered = true;
            if (hit === vm.correctAnswer) {
                vm.answerCounter += 1;
                vm.answered = false;

                if (vm.answerCounter === 2) {
                    vm.answerCounter = 0;
                    PlayerService.battles += 1;
                    if (PlayerService.battles === 3) {
                        console.log(`move to medium difficulty`);
                    }
                }
                console.log(`You answered correct`);
                console.log(`Counter = ${vm.answerCounter}`);
                console.log(`Battles counter = ${PlayerService.battles}`)
            } else {
                console.log(`Wrong answer`);
            }


            console.log(vm.correctAnswer);
        }

        vm.nextQuestion = () => {
            TriviaService.getEasyQuestions().then((response) => {
                vm.questions = response.results;
                vm.randomIndex = Math.floor(Math.random() * vm.questions.length);

                vm.correctAnswer = response.results[vm.randomIndex].correct_answer;
                vm.quizQuestion = response.results[vm.randomIndex].question;
                vm.answers = response.results[vm.randomIndex].incorrect_answers;
                vm.answers.push(response.results[vm.randomIndex].correct_answer);

                vm.answers.sort(function(a, b) { return 0.5 - Math.random() });

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