'use strict';

angular.module('payMyMeetingApp')
.controller('homeController', function ($scope, $http) {
	$http.get('/api/meetings').
	success(function (data, status, headers, config) {
		$scope.meetings = data;
	}).
	error(function (data, status, headers, config) {
	});
})
.controller('createMeetingController', function ($scope, $http) {
	$scope.createMeeting = function(meeting){
		$http.post('/api/meetings/', meeting).
		success(function (data, status, headers, config) {
		}).
		error(function (data, status, headers, config) {
			$window.alert("OOPS ! An error occured while creating the meeting.");
		});
	}
})
.controller('showMeetingController', function ($scope, $http, $routeParams) {
	$scope.meetingId = $routeParams.meetingId;

	$http.get('/api/attendees/' + $scope.meetingId).
	success(function (data, status, headers, config) {
		$scope.attendees = data;
	}).
	error(function (data, status, headers, config) {
	});
	var sock = new SockJS('http://127.0.0.1:3000/notifications');

	sock.onopen = function() {
		console.log('socket connection open');
	};

	sock.onmessage = function(e) {
		alert("socket message" + e.data);
	};

	sock.onclose = function() {
		console.log('socket connection closed');
	};
})
.controller('joinMeetingController', function ($scope, $http, $routeParams) {
	var meetingId = $routeParams.meetingId;

	$http.get('/api/profiles/').
	success(function (data, status, headers, config) {
		$scope.profiles = data;
	}).
	error(function (data, status, headers, config) {
	});

	$scope.joinMeeting = function(joinMeetingRequest){
		joinMeetingRequest.meetingId = meetingId;
		$http.post('/api/attendees/', joinMeetingRequest).
		success(function (data, status, headers, config) {
		}).
		error(function (data, status, headers, config) {
		});
	}
})
.controller('countMeetingCostController', function ($scope) {
});