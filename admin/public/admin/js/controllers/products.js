'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('ProductsCtrl', function($scope, $state, $http, $modal, $log) {

  	$scope.selected = '';

    $scope.$state = $state;

    $http.get('/reports/product').success(function(data, status, headers, config) {
    	$scope.products = data;
    });

  });
