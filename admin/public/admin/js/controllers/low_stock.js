'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:LowStockCtrl
 * @description
 * # LowStockCtrl
 * Controller of yapp
 */
angular.module('yapp')
    .controller('LowStockCtrl', function($scope, $state, $http, $modal, $log) {

    // Controller configs
    $scope.config = {
        'endPoint': '/reports/low_stock/' // endpoint of low stock
    }

    // Store the selected model to update
    $scope.selected = '';

    // Set the state of navigation    
    $scope.$state = $state;

    // Loads/Reloads low stock list
    $scope.reloadLowStockList = function() {
        $http.get($scope.config.endPoint).success(function(data, status, headers, config) {
            // Bind tax to return value    
            $scope.products = data;
        });
    }

    // Inital Load
    $scope.reloadLowStockList();
});