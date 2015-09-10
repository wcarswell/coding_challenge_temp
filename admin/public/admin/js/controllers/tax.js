'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:CountriesCtrl
 * @description
 * # CountriesCtrl
 * Controller of yapp
 */
angular.module('yapp')
    .controller('TaxCtrl', function($scope, $state, $http, $modal, $log) {

    // Controller configs
    $scope.config = {
        'new': 'Add Tax For Country',
        'modify': 'Modify Tax Setup',
        'modalSize': 'sm',
        'templateUrl': 'tax.html',
        'controller': 'ModalTaxCtrl',
        'endPoint': '/admin/tax/',
        'endPointCountry': '/admin/country/'
    }

    // Store the selected model to update
    $scope.selected = '';

    // Set the state of navigation    
    $scope.$state = $state;

    // Loads/Reloads county list
    $scope.reloadTaxList = function() {
        $http.get($scope.config.endPoint).success(function(data, status, headers, config) {
            // Bind tax to return value    
            $scope.tax = data;
        });
    }

    // Loads/Reloads county list
    $scope.reloadCountryList = function() {
        $http.get( $scope.config.endPointCountry ).success(function(data, status, headers, config) {
            // Bind countries to return value    
            $scope.countries = data;
        });
    } 

    // Brings up modal to modify clinic information
    $scope.modify = function(tax) {
        $scope.openModal(tax, $scope.config.modify);
    }

    // Brings up modal to insert new clinic
    $scope.new = function() {
        $scope.openModal('', $scope.config.new);
    }

    // Delete a clinic
    $scope.delete = function(tax) {
        var url = $scope.config.endPoint;
        url += tax.tax_id + '/';

        // Ajax call to post to clinic information
        $http({
            url: url,
            method: "DELETE",
            data: {} // nada here
        })
        .then(function(response) {
                if (response.data.status != 'fail') {
                    // Reload tax list on success
                    $scope.reloadTaxList();
                } else {
                    // Alert user on any errors
                    alert(response.data.message);
                }
            },
            function(response) { // optional
                // Inserting/Updating has failed, alert user
                alert('Failed to delete Tax Setup: ' + tax.country_name);
            });
    }

    // Open the modal
    $scope.openModal = function(tax, action) {
        // Initialise ui-bootstrap model on modify() event
        var modalTax = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: $scope.config.templateUrl, // the html template to parse selected clinic
            controller: $scope.config.controller, // the controller to handle selected clinic
            size: $scope.config.modalSize, // size of modal
            resolve: {
                tax: function() {
                    return tax;
                },
                action: function() {
                    return action;
                },
                config: function() {
                    return $scope.config;
                },
                countries: function() {
                    return $scope.countries;
                }
            }
        });

        // Bind callback functions for save/cancel button
        modalTax.result.then(function(selectedItem) {
            // Reload clinic list on success
            $scope.reloadTaxList();
        }, function() {
            // Log messaging for debug purpose
            $log.info('Modal dismissed at: ' + new Date());
        });
    }

    // Load initial list
    $scope.reloadTaxList();
    $scope.reloadCountryList();
});

angular.module('yapp')
    .controller('ModalTaxCtrl', function($scope, $modalInstance, $http, tax, action, config, countries) {

    // Update action description
    $scope.action = action;

    // Set selected clinic to modal passed through
    $scope.selected = tax;

    // Set countries to modal passed through
    $scope.countries = countries;

    // Event for inserting/updating a clinic
    $scope.ok = function() {
        // Validate input
        if($scope.selected.percent.length > 3 || $scope.selected.percent > 100) {
            alert('Percent value must be smaller than 100');
            return;
        }

        if(isNaN(parseFloat($scope.selected.percent)) && !isFinite($scope.selected.percent)) {
            alert('Percent value must contain numbers');
            return;
        }
        
        var url = config.endPoint;
        if (tax.hasOwnProperty('tax_id')) {
            url += tax.tax_id + '/';
        }

        // Ajax call to post to clinic information
        $http({
            url: url,
            method: "POST",
            data: {
                'tax': $scope.selected
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
            alert('Failed to insert/update tax setup');
        });
    };

    // Event to dismiss modal
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
});