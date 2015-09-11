'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('LoginCtrl', function($scope, $location) {

  	// Submission of user login
	$scope.submit = function() {
		// MVP phase 1 - redirect to dashboard
      	$location.path('/dashboard');

      	// End script
      	return false;
    }

});
