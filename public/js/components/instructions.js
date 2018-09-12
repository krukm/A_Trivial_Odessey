"use strict";

const instructions = {
  template:`
    <section class="section__instructions">
      <section class="instructions__container">
        <h1>Instructions</h1>
        <p>In order to rescue your family you must defeat the gods by going on A Trivial Odyssey.</p>
        <p>Your battles will consist of mythological trivia questions.</p>
        <p>Each battle will have two questions and you will have 30 seconds to answer each question.</p>
        <p>Question intensity will increase as you progess through 9 battles.</p>
        <p>Answer two questions correctly and you will gain an extra heart (health).</p>
        <p>Answering one question incorrectly will result in no health gained.</p>
        <p>If you fail to correctly answer both questions you will lose a heart.</p>
        <p>In the event that you lose all of your hearts you will be thrown back into the underworld to start your journey again.</p>
        <button type="button" ng-click="$ctrl.back();">BACK</button>
      </section>
    </section>
  `, 
  controller: ['$location', function ($location) {
    const vm = this;

    vm.back = () => {
      $location.url('/map');
    }
  }]
}

angular
  .module("app")
  .component("instructions", instructions);