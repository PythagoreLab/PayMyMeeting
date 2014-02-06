'use strict';

angular.module('payMyMeetingApp')
.controller('joinMeetingController', function ($scope, $http, $routeParams, $location, $modalDialog) {
	var meetingId = $routeParams.meetingId;

	$http.get('/api/profiles/').
	success(function (data) {
		$scope.profiles = data;
	}).
	error(function () {
	});

	$scope.joinMeeting = function(joinMeetingRequest){
		if (joinMeetingRequest) {
			joinMeetingRequest.meetingId = meetingId;
			$http.post('/api/attendees/', joinMeetingRequest).
			success(function () {
				$modalDialog.showDialog('Success', 'You have joined the meeting !').then(function() {
					$location.path('/#');
				});
			}).
			error(function () {
			});
		}
	};
});