'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:CountriesCtrl
 * @description
 * # CountriesCtrl
 * Controller of yapp
 */
angular.module('yapp')
    .controller('CountriesCtrl', function($scope, $state, $http, $modal, $log) {

    // Controller configs
    $scope.config = {
    	'new' : 'Add Country',
    	'modify' : 'Modify Country',
    	'modalSize': 'sm',
    	'templateUrl': 'country.html',
    	'controller': 'ModalCountryCtrl',
    	'endPoint': '/admin/country/'
    }
	
	// Store the selected model to update
	$scope.selected = '';
	
	// Set the state of navigation		
	$scope.$state = $state;
	
	// Loads/Reloads county list
	$scope.reloadCountryList = function() {
		$http.get( $scope.config.endPoint ).success(function(data, status, headers, config) {
			// Bind countries to return value    
			$scope.countries = data;
		});
	}	
	
	// Brings up modal to modify country information
	$scope.modify = function(country) {
		$scope.openModal(country, $scope.config.modify);
	}

	// Brings up modal to insert new country
	$scope.new = function() {
		$scope.openModal('', $scope.config.new);
	}

	// Delete a country
	$scope.delete = function(country) {
		var url = $scope.config.endPoint;
    	url += country.country_id + '/';
    	
		// Ajax call to post to country information
        $http({
			url: url,
			method: "DELETE",
			data: {} // nada here
		})
		.then(function(response) {
			if (response.data.status != 'fail') {
				// Reload country list on success
				$scope.reloadCountryList();
			} else {
				// Alert user on any errors
				alert(response.data.message);
			}
		},
		function(response) { // optional
			// Inserting/Updating has failed, alert user
			alert('Failed to delete country: ' + country.name);
		});
	}

	// Open the modal
	$scope.openModal = function(country, action) {
		// Initialise ui-bootstrap model on modify() event
		var modalCountry = $modal.open({
			animation: $scope.animationsEnabled,
			templateUrl: $scope.config.templateUrl, // the html template to parse selected country
			controller:  $scope.config.controller, // the controller to handle selected country
			size: $scope.config.modalSize, // size of modal
			resolve: {
				country: function() {
					return country;
				},
				action: function() {
					return action;
				},
				config: function() {
					return $scope.config;
				}
			}
		});
		
		// Bind callback functions for save/cancel button
		modalCountry.result.then(function(selectedItem) {
			// Reload country list on success
			$scope.reloadCountryList();
		}, function() {
			// Log messaging for debug purpose
			$log.info('Modal dismissed at: ' + new Date());
		});
	}
	
	// Load initial list
	$scope.reloadCountryList();
});

angular.module('yapp')
	.controller('ModalCountryCtrl', function($scope, $modalInstance, $http, country, action, config) {
	
	// Update action description
	$scope.action = action;
		
	// Set selected country to modal passed through
    $scope.selected = country;
	console.log(config.endPoint);
	// Event for inserting/updating a country
    $scope.ok = function() {
    	var url = config.endPoint;
    	if( country.hasOwnProperty('country_id') ) {
    		url += country.country_id + '/';
    	}

		// Ajax call to post to country information
        $http({
			url: url,
			method: "POST",
			data: {
				'country': $scope.selected
			}
		})
		.then(function(response) {
			if (response.data.status != 'fail') {
				// Close modal on success
				$modalInstance.close();
			} else {
				// Alert user on any errors
				alert(response.data.message);
			}
		},
		function(response) { // optional
			// Inserting/Updating has failed, alert user
			alert('Failed to insert/update country');
		});
    };
	
	// Event to dismiss modal
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
});