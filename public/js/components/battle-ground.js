'use strict';

const battleGround = {
    template: `
    <section class="question__container">
        <div><img class="zues" src="./img/zues.png"></div>
        <p class="trivia__question"> {{ $ctrl.quizQuestion }} </p>
        <form class="answers"> 
            <div ng-repeat="answer in $ctrl.answers" ng-class="{'answered': $ctrl.answered}" >
            <label ng-class="answer === $ctrl.correctAnswer ? 'correct' : 'incorrect'">
                <input ng-click="$ctrl.userChooseAnswer(answer)" type="radio" ng-model="response" ng-value="answer">
                {{ answer }}
            </label>
            </div>
        </from>
    </section>
    
    <footer>

    </footer>
    `,

    controller: ["TriviaService", function(TriviaService) {
        const vm = this;
        vm.answered = false;

        // vm.getEasyTriviaQuestions = () => {
        TriviaService.getEasyQuestions().then((response) => {
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
            vm.answers.sort(function(a,b){return 0.5 - Math.random()});

            console.log(vm.answers);
        })
        // }

        // vm.getAnotherQuestion = () => {

        // }

        vm.userChooseAnswer = (hit) => {
            console.log(hit);
            vm.answered = true;
            if (hit === "Apollo") {
                vm.answered = false;
                TriviaService.getEasyQuestions().then((response) => {
                    vm.randomIndex = Math.floor(Math.random() * vm.answers.length)

                    vm.correctAnswer = response.results[vm.randomIndex].correct_answer;
                    vm.quizQuestion = response.results[vm.randomIndex].question;
                    vm.answers = response.results[vm.randomIndex].incorrect_answers;
                    vm.answers.push(response.results[vm.randomIndex].correct_answer);

                    vm.answers.sort(function(a,b){return 0.5 - Math.random()});

                    console.log(vm.answers);
                    console.log(`Random index is ${vm.randomIndex}`);
                })
            }
    
            console.log(vm.correctAnswer);
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