'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('DashboardCtrl', function($scope, $state, $http) {

    $scope.$state = $state;

    $http.get('/test/').success(function(data, status, headers, config) {
        console.log(data[0].name);

        $scope.name = data[0].name;
        $scope.surname = data[0].surname;
    });

  });
