'use strict';

const battleGround = {
    template: `
        <button ng-click="$ctrl.getEasyTriviaQuestions()">Easy</button>
        <button ng-click="$ctrl.getMediumTriviaQuestions()">Medium</button>
        <button ng-click="$ctrl.getHardTriviaQuestions()">Hard</button>
        <p> {{ $ctrl.easyQuestion.question }} </p>
        <ul> 
            <li ng-repeat="answer in $ctrl.easyQuestion">{{ answer }}</li>
             
        </ul>    
    `,
    controller: ["TriviaService", function(TriviaService) {
        const vm = this;

        vm.getEasyTriviaQuestions = () => {
            TriviaService.getEasyQuestions().then((response) => {
                console.log(response.results[0].question);
                vm.easyQuestion = response.results[0].incorrect_answers;
                vm.easyQuestion.push(response.results[0].correct_answer);
                let array2 = [];
                while (vm.easyQuestion.length !== 0) {
              
                  // Pick a remaining element...
                  let randomIndex = Math.floor(Math.random() * vm.easyQuestion.length);
                  array2.push(vm.easyQuestion[randomIndex]);
                  vm.easyQuestion.splice(randomIndex, 1);
                }
                vm.easyQuestion = array2;
                console.log(vm.easyQuestion);
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