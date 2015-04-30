(function () {
  'use strict';

  angular.module('eliteApp').controller('TeamsCtrl', ['eliteApi', TeamsCtrl]);

  function TeamsCtrl(eliteApi) {
    var vm = this;

    var data = eliteApi.getLeagueData();
    vm.teams = data.teams;
  }
})();
