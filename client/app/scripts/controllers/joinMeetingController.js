'use strict';

angular.module('payMyMeetingApp')
.controller('joinMeetingController', function ($scope, $http, $routeParams) {
	var meetingId = $routeParams.meetingId;

	$http.get('/api/profiles/').
	success(function (data) {
		$scope.profiles = data;
	}).
	error(function () {
	});

	$scope.joinMeeting = function(joinMeetingRequest){
		joinMeetingRequest.meetingId = meetingId;
		$http.post('/api/attendees/', joinMeetingRequest).
		success(function () {
		}).
		error(function () {
		});
	};
});