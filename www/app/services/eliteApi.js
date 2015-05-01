(function () {
  'use strict';

  angular.module('eliteApp').factory('eliteApi', ['$http', '$q', '$ionicLoading', 'DSCacheFactory', eliteApi]);

  function eliteApi($http, $q, $ionicLoading, DSCacheFactory) {

    var currentLeagueId;

    self.leaguesCache = DSCacheFactory.get('leaguesCache');
    self.leagueDataCache = DSCacheFactory.get('leagueDataCache');

    function getLeagues() {
      var deferred = $q.defer(),
        cacheKey = 'Leagues',
        leaguesData = self.leaguesCache.get(cacheKey);

      if (leaguesData) {
        console.log('Found data inside cache', leaguesData);
        deferred.resolve(leaguesData);
      } else {
        $ionicLoading.show({template: 'Loading...'});

        $http.get('http://elite-schedule.net/api/leaguedata')
          .success(function (data, status) {
            console.log('Received data via HTTP.', data, status);
            self.leaguesCache.put(cacheKey, data);
            $ionicLoading.hide();
            deferred.resolve(data);
          })
          .error(function () {
            console.log('Error while making HTTP call.');
            $ionicLoading.hide();
            deferred.reject(data);
          });
      }

      return deferred.promise;
    }

    function getLeagueData() {
      var deferred = $q.defer();
      $ionicLoading.show({template: 'Loading...'});

      $http.get('http://elite-schedule.net/api/leaguedata/' + currentLeagueId)
        .success(function (data, status) {
          console.log('Received data via HTTP.', data, status);
          $ionicLoading.hide();
          deferred.resolve(data)
        })
        .error(function () {
          console.log('Error while making HTTP call.');
          $ionicLoading.hide();
          deferred.reject(data)
        });

      return deferred.promise;
    }

    function setLeagueId(leagueId) {
      currentLeagueId = leagueId
    }

    return {
      getLeagues: getLeagues,
      getLeagueData: getLeagueData,
      setLeagueId: setLeagueId
    };
  }
})();
