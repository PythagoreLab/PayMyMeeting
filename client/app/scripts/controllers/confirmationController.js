'use strict';

angular.module('payMyMeetingApp')
.controller('confirmationController', function ($scope, $modalInstance) {
	$scope.yes = function () {
		$modalInstance.close(true);
	};

	$scope.no = function () {
		$modalInstance.dismiss(false);
	};
});