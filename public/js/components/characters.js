'use strict';

const characters = {
    template:`
    <h1>Character Bios</h1>
    <section class="section__character-container">
        <ul class="ul__gods">
            <li ng-repeat="character in $ctrl.characters" ng-click="$ctrl.selectCharacter(character.name);">
                <a href="">{{ character.name }}</a>
            </li>
        </ul>
        <section>
            <img ng-src=" {{ $ctrl.pic }}">
            <p>Bio: {{ $ctrl.bio }} </p>
        </section>

        <button ng-click="$ctrl.back()">BACK</button>
    </section>

    `,
    controller: ["BioService", "$location", function (BioService, $location) {
        const vm = this;

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