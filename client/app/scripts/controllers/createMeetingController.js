'use strict';

angular.module('payMyMeetingApp')
.controller('createMeetingController', function ($scope, $http, $window, $location) {
	$scope.createMeeting = function(meeting){
		$http.post('/api/meetings/', meeting).
		success(function (data) {
			$location.path('/meeting/' + data.id);
		}).
		error(function () {
			$window.alert('OOPS ! An error occured while creating the meeting.');
		});
	};
});