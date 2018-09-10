"use strict";

function MapService() {
    const vm = this;
    vm.mapLines = null;

    vm.getMapLines = () => {
        return vm.mapLines;
    }

    vm.setMapLines = (lines) => {
        vm.mapLines = lines;
    }
}

angular.module('app').service('MapService', MapService);