'use strict';

angular.module('payMyMeetingApp')
.controller('homeController', function ($scope, $http) {
	$http.get('/api/meetings').
	success(function (data) {
		$scope.meetings = data;
	}).
	error(function () {
	});
})
.controller('createMeetingController', function ($scope, $http, $window) {
	$scope.createMeeting = function(meeting){
		$http.post('/api/meetings/', meeting).
		success(function () {
		}).
		error(function () {
			$window.alert('OOPS ! An error occured while creating the meeting.');
		});
	};
})
.controller('showMeetingController', function ($scope, $http, $routeParams) {
	$scope.meetingId = $routeParams.meetingId;

	$http.get('/api/attendees/' + $scope.meetingId).
	success(function (data) {
		$scope.attendees = data;
	}).
	error(function () {
	});
	var sock = new SockJS('http://127.0.0.1:3000/notifications');

	sock.onopen = function() {
		console.log('socket connection open');
	};

	sock.onmessage = function(e) {
		alert('socket message ' + e.data);
	};

	sock.onclose = function() {
		console.log('socket connection closed');
	};
})
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
})
.controller('countMeetingCostController', function ($scope) {
	$scope.count = 100;
});