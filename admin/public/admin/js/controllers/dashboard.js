'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of yapp
 * Does the main logic for web view
 */
angular.module('yapp')
  .controller('DashboardCtrl', function($scope, $state, $http) {

    // Set the state of navigation 
    $scope.$state = $state;

    // Place holder for alerts
    $scope.alerts = [];
    
    // Load low stock alerts
    $scope.reloadLowStockAlert = function() {
        // Reset alerts
        $scope.alerts = [];

        // Load alerts
        $http.get('/reports/low_stock').success(function(data, status, headers, config) {
            
            // Update scope of alerts of low stock items
            for(var i = 0; i<data.length; i++) {
                $scope.alerts.push({msg: data[i].clinic_name + ' is low on ' + data[i].name });
            }
        });
    }
    
    // Close alerts
    $scope.closeAlert = function(index) {
        $scope.alerts = [];
    };

    // Initial load
    $scope.reloadLowStockAlert();
});
