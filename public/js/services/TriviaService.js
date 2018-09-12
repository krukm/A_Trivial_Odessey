"use strict";

function TriviaService($http) {
  const vm = this;

  vm.easyQuestions = [];

  vm.getEasyQuestions = () => {
    return $http({
      method: "GET",
      url: "https://opentdb.com/api.php?amount=10&category=20&difficulty=easy&type=multiple"
    }).then((response) => {
      for (let i = 0; i < response.data.results.length; i++) {
        vm.easyQuestions.push(response.data.results[i].question.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&amp;/g, "&"));
      }
      return vm.easyQuestions;
    });
  }

  vm.getMediumQuestions = () => {
    return $http({
      method: "GET",
      url: "https://opentdb.com/api.php?amount=10&category=20&difficulty=medium&type=multiple"
    }).then((response) => {
      console.log(response.data);
      return response.data;
    });
  }

  vm.getHardQuestions = () => {
    return $http({
      method: "GET",
      url: "https://opentdb.com/api.php?amount=7&category=20&difficulty=hard&type=multiple"
    }).then((response) => {
      console.log(response.data);
      return response.data;
    });
  }
}



angular
  .module("app")
  .service("TriviaService", TriviaService);