"use strict";

function TriviaService($http) {
  const vm = this;

  vm.getEasyQuestions = () => {
    return $http({
      method: "GET",
      url: "https://opentdb.com/api.php?amount=10&category=20&difficulty=easy&type=multiple"
    }).then((response) => {
      console.log(response.data);
      return response.data;
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