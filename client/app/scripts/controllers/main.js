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
.controller('showMeetingController', function ($scope, $http) {
	$http.get('/api/attendees/52f0f5e3404452581ab77e05').
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
.controller('joinMeetingController', function ($scope, $http) {
	$scope.joinMeeting = function(joinMeetingRequest){
		$http.post('/api/attendees/', joinMeetingRequest).
		success(function (data, status, headers, config) {
		}).
		error(function (data, status, headers, config) {
		});
	}
})
.controller('countMeetingCostController', function ($scope) {
});