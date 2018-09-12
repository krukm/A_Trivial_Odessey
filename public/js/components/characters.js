'use strict';

const characters = {
    template:`
    <section class="section__character-container">
        <ul class="ul__gods"></ul>
        <section>
            <img ng-src=" {{ $ctrl.pic }}">
            <p>Bio: {{ $ctrl.bio }} </p>
        </section>
    </section>

    `,
    controller: function () {
        const vm = this;

        vm.characters = [
            {name: 'Achilles', bio: ''},
            {name: 'Athena', bio: ''},
            {name: 'Cerebrus', bio: ''},
            {name: 'Hades', bio: ''},
            {name: 'Hercules', bio: ''},
            {name: 'Polyphemus', bio: ''},
            {name: 'Poseidon', bio: ''},
            {name: 'Siren', bio: ''},
            {name: 'Zeus', bio: ''}
        ];

        vm.selectCharacter = () => {
            
        }
    }
}

angular.module('app').compnent('characters', characters);