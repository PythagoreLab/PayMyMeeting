'use strict';

angular.module('payMyMeetingApp')
.controller('modalDialogController', function ($scope, $modalInstance, content) {

	$scope.title = content.title;
	$scope.content = content.content;
	$scope.buttons = content.buttons;

	$scope.ok = function () {
		$modalInstance.close(true);
	};

	$scope.cancel = function () {
		$modalInstance.dismiss(false);
	};
});