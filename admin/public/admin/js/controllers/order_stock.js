'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:CountriesCtrl
 * @description
 * # CountriesCtrl
 * Controller of yapp
 */
angular.module('yapp')
    .controller('OrdersCtrl', function($scope, $state, $http, $modal, $log) {

    // Controller configs
    $scope.config = {
        'new': 'Add Order',
        'modify': 'Modify Order',
        'modalSize': '',
        'templateUrl': 'order.html',
        'controller': 'ModalOrdersCtrl',
        'endPoint': '/admin/orders/',
        'endPointVendor': '/admin/vendor/',
        'endPointTax': '/admin/tax_with_currency/'
    }

    // Store the selected model to update
    $scope.selected = '';

    // Set the state of navigation    
    $scope.$state = $state;

    // Loads/Reloads county list
    $scope.reloadOrdersList = function() {
        $http.get($scope.config.endPoint).success(function(data, status, headers, config) {
            // Bind countries to return value    
            $scope.orders = data;
        });
    }

    // Loads/Reloads county list
    $scope.reloadVendorsList = function() {
        $http.get( $scope.config.endPointVendor ).success(function(data, status, headers, config) {
            // Bind countries to return value    
            $scope.vendors = data;
        });
    } 

    $scope.reloadTaxList = function() {
        $http.get( $scope.config.endPointTax ).success(function(data, status, headers, config) {
            // Bind countries to return value    
            $scope.tax = data;
        });
    } 

    // // Brings up modal to modify clinic information
    // $scope.modify = function(clinic) {
    //     $scope.openModal(clinic, $scope.config.modify);
    // }

    // Brings up modal to insert new clinic
    $scope.new = function() {
        $scope.openModal('', $scope.config.new);
    }

    // Delete a clinic
    $scope.delete = function(order) {
        var url = $scope.config.endPoint;
        url += order.stock_order_id + '/';

        // Ajax call to post to clinic information
        $http({
            url: url,
            method: "DELETE",
            data: {} // nada here
        })
        .then(function(response) {
                if (response.data.status != 'fail') {
                    // Reload clinic list on success
                    $scope.reloadOrdersList();
                } else {
                    // Alert user on any errors
                    alert(response.data.message);
                }
            },
            function(response) { // optional
                // Inserting/Updating has failed, alert user
                alert('Failed to delete order: ' + order.stock_order_id);
            });
    }

    // Open the modal
    $scope.openModal = function(order, action) {
        // Initialise ui-bootstrap model on modify() event
        var modalOrder = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: $scope.config.templateUrl, // the html template to parse selected clinic
            controller: $scope.config.controller, // the controller to handle selected clinic
            size: $scope.config.modalSize, // size of modal
            resolve: {
                order: function() {
                    return order;
                },
                action: function() {
                    return action;
                },
                config: function() {
                    return $scope.config;
                },
                vendors: function() {
                    return $scope.vendors;
                },
                tax: function() {
                    return $scope.tax;
                }
            }
        });

        // Bind callback functions for save/cancel button
        modalOrder.result.then(function(selectedItem) {
            // Reload clinic list on success
            $scope.reloadOrdersList();
        }, function() {
            // Log messaging for debug purpose
            $log.info('Modal dismissed at: ' + new Date());
        });
    }

    // Load initial list
    $scope.reloadOrdersList();
    $scope.reloadVendorsList();
    $scope.reloadTaxList();
});

angular.module('yapp')
    .controller('ModalOrdersCtrl', function($scope, $modalInstance, $http, order, action, config, vendors, tax) {

    // Update action description
    $scope.action = action;

    // Set selected order to modal passed through
    console.log(order);
    $scope.selected = order;

    // Set countries to modal passed through
    $scope.vendors = vendors;

    // Set countries to modal passed through
    $scope.tax = tax;

    // Event for inserting/updating a clinic
    $scope.ok = function() {
        var url = config.endPoint;
        if (order.hasOwnProperty('order_id')) {
            url += order.order_id + '/';
        }

        // Ajax call to post to clinic information
        $http({
            url: url,
            method: "POST",
            data: {
                'order': $scope.selected
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
            alert('Failed to insert/update clinic');
        });
    };

    // Event to dismiss modal
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
});