'use strict';

angular.module('payMyMeetingApp')
.controller('createMeetingController', function ($scope, $http, $window) {
	$scope.createMeeting = function(meeting){
		$http.post('/api/meetings/', meeting).
		success(function () {
		}).
		error(function () {
			$window.alert('OOPS ! An error occured while creating the meeting.');
		});
	};
});