'use strict';

const battleGround = {
    template: `
        <button ng-click="$ctrl.getEasyTriviaQuestions()">Get Data</button>
    `,
    controller: ["TriviaService", function(TriviaService) {
        const vm = this;

        vm.getEasyTriviaQuestions = () => {
            TriviaService.getEasyQuestions().then((response) => {
                console.log(response);
            });
        }
    }]
}

angular.module('app').component('battleGround', battleGround);