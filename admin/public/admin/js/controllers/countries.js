'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('CountriesCtrl', function($scope, $state, $http, $modal, $log) {

  	$scope.selected = '';

    $scope.$state = $state;

    $http.get('/admin/country').success(function(data, status, headers, config) {
    	$scope.countries = data;
    });

    $scope.modify = function(country) {
    	var modalCountry = $modal.open({
	      animation: $scope.animationsEnabled,
	      templateUrl: 'country.html',
	      controller: 'ModalCountryCtrl',
	      resolve: {
	        country: function () {
	          return country
	        }
	      }
	    });

	    modalCountry.result.then(function (selectedItem) {
	      //$scope.selected = selectedItem;
	      $scope.countries.push(selectedItem);
	      	
	    }, function () {
	      $log.info('Modal dismissed at: ' + new Date());
	    });
    }



    $scope.newCountry = function() {
    	var modalCountry = $modal.open({
	      animation: $scope.animationsEnabled,
	      templateUrl: 'country.html',
	      controller: 'ModalCountryCtrl',
	      resolve: {
	        country: function () {
	         	return '';
	        }
	      }
	    });

	    modalCountry.result.then(function (selectedItem) {
	      //$scope.selected = selectedItem;
	      $scope.countries.push(selectedItem);
	      	
	    }, function () {
	      $log.info('Modal dismissed at: ' + new Date());
	    });
    }

  });

  angular.module('yapp').controller('ModalCountryCtrl', function ($scope, $modalInstance, $http, country) {

  	$scope.selected = country;

  $scope.ok = function () {
  	$http({
        url: '/admin/country/',
        method: "POST",
        data: { 'country' : $scope.selected }
    })
    .then(function(response) {
    	if(response.data.message != '') {
    		alert(response.data.message);
    	} else {
    		$scope.selected.country_id = response.data.country_id;
    		$modalInstance.close($scope.selected);
    	}
    }, 
    function(response) { // optional
            // failed
	});
   	//$modalInstance.close($scope.selected);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
