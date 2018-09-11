"use strict"

function EnemyService() {
    const vm = this;
    vm.cerberus = "Guarding the gate to the underworld so that the dead do not leave is Cerberus, a vile three headed hound. Each of the heads snarls and gnashes teeth as you approach. You must face the beast or remain in the underworld forever … ";

    vm.hades = "Hades, god of the dead, is not inclined to let the dead leave his dominion. He stands sternly before you. His subjects do not cheat death easily …";

    vm.sirens = "You step out from the underworld. A great ocean separates the world of the living from the dead. Luckily a boat is nearby (a favor from the gods). You sail for some time guided by the winds. An enchanting song you hear and are compelled to follow. A trap! Think fast!";

    vm.poseidon = "Having evaded the sirens, you float feverishly on a calm sea. Poseidon has other plans for you though. He strikes the sea with his trident and huge waves envelop your boat as you cling on despite Poseidon’s fury.";

    vm.achilles = 'You awake upon a beach having evaded Poseidon. You wander lost and hungry and have almost give up hope when Athena, god of wisdom and war, appears. She has taken an interest in your mortal endeavors and will help you if you can prove yourself. Athena places you under the tutelage of Achilles, the great warrior. “You have much to learn and no time to lose” he says. “I will not take it easy on you.” ';

    vm.polyphemus = "well from Achilles and undertake your journey to Mt Olympus. You choose a spot in a cave to rest. Unbeknownst to you the cave is home to Polyphemus, the cyclops. He hungrily eyes you …";

    vm.prometheus = "A great eagle swoops down upon a form attached to a rock. It’s Prometheus! He defied Zeus and brought fire to humans from Mt. Olympus. Help Prometheus and he may help you.";

    vm.hercules = "You release Prometheus and he guides you to Mt. Olympus, home of the gods. The mountain looms before you.";

    vm.zeus = "Zeus has followed your journey from the Underworld, across the ocean and your encounters with the Cyclops and Prometheus. “I did not expect you to make it this far. You are still a mere mortal”. A lighting bolt appears in his hand. Zeus is the last thing standing between you and your loved ones!";





}



angular
    .module("app")
    .service("EnemyService", EnemyService);