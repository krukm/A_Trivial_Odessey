'use strict';

const battleGround = {
    template: `
        <button ng-click="$ctrl.getEasyTriviaQuestions()">Easy</button>
        <button ng-click="$ctrl.getMediumTriviaQuestions()">Medium</button>
        <button ng-click="$ctrl.getHardTriviaQuestions()">Hard</button>
        <p> {{ $ctrl.quizQuestion }} </p>
        <form> 
            <div ng-repeat="answer in $ctrl.answers">
            <label ng-class="answer === $ctrl.correct_answer ? 'correct' : 'incorrect'">
                <input ng-click="$ctrl.testRadio(answer)" type="radio" ng-model="response" ng-value="answer">
                {{ answer }}
            </label>
            </div>
        </from>    
    `,

    controller: ["TriviaService", function(TriviaService) {
        const vm = this;

        vm.getEasyTriviaQuestions = () => {
            TriviaService.getEasyQuestions().then((response) => {
                vm.correctAnswer = response.results[0].correct_answer;
                vm.quizQuestion = response.results[0].question;
                vm.answers = response.results[0].incorrect_answers;
                vm.answers.push(response.results[0].correct_answer);
                let array2 = [];
                while (vm.answers.length !== 0) {
                  let randomIndex = Math.floor(Math.random() * vm.answers.length);
                  array2.push(vm.answers[randomIndex]);
                  vm.answers.splice(randomIndex, 1);
                }
                vm.answers = array2;
                console.log(vm.answers);
            })
        }

        vm.testRadio = (hit) => {
            console.log(hit);
            // console.log(response.results[0].correct_answer);
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