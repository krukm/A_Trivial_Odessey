'use strict';

const characters = {
    template:`
    <h1 class="character__title">Character Bios</h1>
    <section class="section__character-container">
        <ul class="ul__gods">
            <li ng-repeat="character in $ctrl.characters" ng-click="$ctrl.selectCharacter(character.name);">
                <a href="">{{ character.name }}</a>
            </li>
        </ul>
        <section class="bio">
            <p ng-if="$ctrl.selectBio === false" class="select__bio">SELECT A CHARACTER TO REVEAL THEIR BIO.</p>
            <section class="bio__info" ng-if="$ctrl.bioShow">
                <img ng-src=" {{ $ctrl.pic }}">
                <p>{{ $ctrl.bio }}</p>
            </section>
        </section>

    </section>
    <button class="back__button" ng-click="$ctrl.back()">BACK</button>

    `,
    controller: ["BioService", "$location", function (BioService, $location) {
        const vm = this;
        vm.bioShow = false;
        vm.selectBio = false;

        vm.characters = [
            {name: 'Achilles'},
            {name: 'Athena'},
            {name: 'Cerebrus'},
            {name: 'Hades'},
            {name: 'Hercules'},
            {name: 'Polyphemus'},
            {name: 'Poseidon'},
            {name: 'Siren'},
            {name: 'Zeus'}
        ];

        vm.back = () => {
            $location.url('/map');
        }

        vm.selectCharacter = (hit) => {
            vm.selectBio = true;
            vm.bioShow = true;
            if (hit === "Achilles") {
                vm.pic = "./img/Achilles.png";
                vm.bio = BioService.Achilles;

            } else if (hit === "Athena") {
                vm.pic = "./img/Athena.png";
                vm.bio = BioService.Athena;

            } else if (hit === "Cerebrus") {
                vm.pic = "./img/Cerebrus.png";
                vm.bio = BioService.Cerebrus;

            } else if (hit === "Hades") {
                vm.pic = "./img/Hades.png";
                vm.bio = BioService.Hades;

            } else if (hit === "Hercules") {
                vm.pic = "./img/Hercules.png";
                vm.bio = BioService.Hercules;

            } else if (hit === "Polyphemus") {
                vm.pic = "./img/Polyphemus.png";
                vm.bio = BioService.Polyphemus;

            } else if (hit === "Poseidon") {
                vm.pic = "./img/Poseidon.png";
                vm.bio = BioService.Poseidon;

            } else if (hit === "Siren") {
                vm.pic = "./img/Siren.png";
                vm.bio = BioService.Siren;

            } else if (hit === "Zeus") {
                vm.pic = "./img/Zeus.png";
                vm.bio = BioService.Zeus;
            }
        }
    }]
}

angular.module('app').component('characters', characters);