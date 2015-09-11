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

	    // Controller configs
    $scope.config = {
        'new': 'Add Product Per Clinic',
        'modify': 'Modify Product',
        'modalSize': 'sm',
        'templateUrl': 'product.html',
        'controller': 'ModalProductCtrl',
        'endPoint': '/reports/product/',
        'endPointClinic': '/admin/clinic/'
    }

    // Store the selected model to update
    $scope.selected = '';

    // Set the state of navigation    
    $scope.$state = $state;

    // Loads/Reloads county list
    $scope.reloadProductList = function() {
        $http.get($scope.config.endPoint).success(function(data, status, headers, config) {
            // Bind tax to return value    
            $scope.products = data;
        });
    }

    // Loads/Reloads county list
    $scope.reloadClinicList = function() {
        $http.get( $scope.config.endPointClinic ).success(function(data, status, headers, config) {
            // Bind countries to return value    
            $scope.clinics = data;
        });
    } 

    // Brings up modal to modify clinic information
    $scope.modify = function(product) {
        $scope.openModal(product, $scope.config.modify);
    }

    // Brings up modal to insert new clinic
    $scope.new = function() {
        $scope.openModal('', $scope.config.new);
    }

    // Delete a clinic
    $scope.delete = function(product) {
        var url = $scope.config.endPoint;
        url += product.product_id + '/';

        // Ajax call to post to clinic information
        $http({
            url: url,
            method: "DELETE",
            data: {} // nada here
        })
        .then(function(response) {
            if (response.data.status != 'fail') {
                // Reload product list on success
                $scope.reloadProductList();
            } else {
                // Alert user on any errors
                alert(response.data.message);
            }
        },
        function(response) { // optional
            // Inserting/Updating has failed, alert user
            alert('Failed to delete Product: ' + product.name);
        });
    }

    // Open the modal
    $scope.openModal = function(product, action) {
        // Initialise ui-bootstrap model on modify() event
        var modalProduct = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: $scope.config.templateUrl, // the html template to parse selected clinic
            controller: $scope.config.controller, // the controller to handle selected clinic
            size: $scope.config.modalSize, // size of modal
            resolve: {
                product: function() {
                    return product;
                },
                action: function() {
                    return action;
                },
                config: function() {
                    return $scope.config;
                },
                clinic: function() {
                    return $scope.clinics;
                }
            }
        });

        // Bind callback functions for save/cancel button
        modalProduct.result.then(function(selectedItem) {
            // Reload clinic list on success
            $scope.reloadProductList();
            $scope.reloadLowStockAlert();
        }, function() {
            // Log messaging for debug purpose
            $log.info('Modal dismissed at: ' + new Date());
        });
    }

    // Load initial list
    $scope.reloadProductList();
    $scope.reloadClinicList();
});

angular.module('yapp')
    .controller('ModalProductCtrl', function($scope, $modalInstance, $http, product, action, config, clinic) {

    // Update action description
    $scope.action = action;

    // Set selected clinic to modal passed through
    $scope.selected = product;

    // Set countries to modal passed through
    $scope.clinics = clinic;

    // Event for inserting/updating a clinic
    $scope.ok = function() {
        var url = config.endPoint;
        if (product.hasOwnProperty('product_id')) {
            url += product.product_id + '/';
        }

        // Ajax call to post to clinic information
        $http({
            url: url,
            method: "POST",
            data: {
                'product': $scope.selected
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
            alert('Failed to insert/update product');
        });
    };

    // Event to dismiss modal
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
});
