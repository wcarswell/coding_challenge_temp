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
    $scope.alerts = [];


    
    //// Load countries
    $http.get('/reports/product').success(function(data, status, headers, config) {
        var alert_message = '';
        for(var i = 0; i<data.length; i++) {
            $scope.alerts.push({msg: data[i].clinic_id + ' is low on ' + data[i].name });
        }
        
        
        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };
    });

  });
