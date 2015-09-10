'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('ClinicsCtrl', function($scope, $state, $http, $modal, $log) {

  	$scope.selected = '';

    $scope.$state = $state;

    $http.get('/admin/clinic').success(function(data, status, headers, config) {
    	$scope.clinics = data;
    });

    $scope.modify = function(clinic) {
    	console.log(clinic);
    	var modalClinic = $modal.open({
	      animation: $scope.animationsEnabled,
	      templateUrl: 'clinic.html',
	      controller: 'ModalClinicCtrl',
	      resolve: {
	        clinic: function () {
	          return clinic
	        }
	      }
	    });

	    modalClinic.result.then(function (selectedItem) {
	      //$scope.selected = selectedItem;
	      $scope.clinics.push(selectedItem);
	      	
	    }, function () {
	      $log.info('Modal dismissed at: ' + new Date());
	    });
    }



    $scope.new = function() {
    	var modalClinic = $modal.open({
	      animation: $scope.animationsEnabled,
	      templateUrl: 'clinic.html',
	      controller: 'ModalClinicCtrl',
	      resolve: {
	        clinic: function () {
	         	return '';
	        }
	      }
	    });

	    modalClinic.result.then(function (selectedItem) {
	      //$scope.selected = selectedItem;
	      $scope.clinics.push(selectedItem);
	      	
	    }, function () {
	      $log.info('Modal dismissed at: ' + new Date());
	    });
    }

  });

  angular.module('yapp').controller('ModalClinicCtrl', function ($scope, $modalInstance, $http, clinic) {

  	$scope.selected = clinic;
  	console.log(clinic);

  $scope.ok = function () {
  	$http({
        url: '/admin/clinic/',
        method: "POST",
        data: { 'clinic' : $scope.selected }
    })
    .then(function(response) {
    	if(response.data.message != '') {
    		alert(response.data.message);
    	} else {
    		$scope.selected.clinic_id = response.data.clinic_id;
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
