'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:CountriesCtrl
 * @description
 * # CountriesCtrl
 * Controller of yapp
 */
angular.module('yapp')
    .controller('VendorCtrl', function($scope, $state, $http, $modal, $log) {

    // Controller configs
    $scope.config = {
        'new': 'Add Vendor',
        'modify': 'Modify Vendor',
        'modalSize': '',
        'templateUrl': 'vendor.html',
        'controller': 'ModalVendorCtrl',
        'endPoint': '/admin/vendor/'
    }

    // Store the selected model to update
    $scope.selected = '';

    // Set the state of navigation    
    $scope.$state = $state;

    // Loads/Reloads county list
    $scope.reloadVendorList = function() {
        $http.get($scope.config.endPoint).success(function(data, status, headers, config) {
            // Bind tax to return value    
            $scope.vendors = data;
        });
    }

    // Brings up modal to modify vendor information
    $scope.modify = function(vendor) {
        $scope.openModal(vendor, $scope.config.modify);
    }

    // Brings up modal to insert new vendor
    $scope.new = function() {
        $scope.openModal('', $scope.config.new);
    }

    // Delete a vendor
    $scope.delete = function(vendor) {
        var url = $scope.config.endPoint;
        url += vendor.vendor_id + '/';

        // Ajax call to post to clinic information
        $http({
            url: url,
            method: "DELETE",
            data: {} // nada here
        })
        .then(function(response) {
            if (response.data.status != 'fail') {
                // Reload tax list on success
                $scope.reloadVendorList();
            } else {
                // Alert user on any errors
                alert(response.data.message);
            }
        },
        function(response) { // optional
            // Inserting/Updating has failed, alert user
            alert('Failed to delete Vendor Setup: ' + vendor.name);
        });
    }

    // Open the modal
    $scope.openModal = function(vendor, action) {
        // Initialise ui-bootstrap model on modify() event
        var modalVendor = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: $scope.config.templateUrl, // the html template to parse selected clinic
            controller: $scope.config.controller, // the controller to handle selected clinic
            size: $scope.config.modalSize, // size of modal
            resolve: {
                vendor: function() {
                    return vendor;
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
        modalVendor.result.then(function(selectedItem) {
            // Reload clinic list on success
            $scope.reloadVendorList();
        }, function() {
            // Log messaging for debug purpose
            $log.info('Modal dismissed at: ' + new Date());
        });
    }

    // Load initial list
    $scope.reloadVendorList();    
});

angular.module('yapp')
    .controller('ModalVendorCtrl', function($scope, $modalInstance, $http, vendor, action, config) {

    // Update action description
    $scope.action = action;

    // Set selected clinic to modal passed through
    $scope.selected = vendor;

    // Event for inserting/updating a clinic
    $scope.ok = function() {
        
        var url = config.endPoint;
        if (vendor.hasOwnProperty('vendor_id')) {
            url += vendor.vendor_id + '/';
        }

        // Ajax call to post to clinic information
        $http({
            url: url,
            method: "POST",
            data: {
                'vendor': $scope.selected
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
            alert('Failed to insert/update vendor setup');
        });
    };

    // Event to dismiss modal
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
});