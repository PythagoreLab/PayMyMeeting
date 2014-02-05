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
.controller('showMeetingController', function ($scope, $http, $routeParams, $log) {
	$scope.meetingId = $routeParams.meetingId;

	$http.get('/api/attendees/' + $scope.meetingId).
	success(function (data) {
		$scope.attendees = data;
	}).
	error(function () {
	});
	var sock = new SockJS('http://127.0.0.1:3000/notifications');

	sock.onopen = function() {
		$log('socket connection open');
	};

	sock.onmessage = function(e) {
		$log('socket message ' + e.data);
	};

	sock.onclose = function() {
		$log('socket connection closed');
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
.controller('countMeetingCostController', function ($scope, $q, $http, $routeParams, $interval) {
	var meetingId = $routeParams.meetingId;
	var totalCostPerSecond = 0;

	var getCostFromProfileId = function(profiles, id) {
		for (var i = 0; i < profiles.length; i ++){
			if (profiles[i].id === id) {
				return profiles[i].cost;
			}
		}
		return 0;
	};

	$q
	.all([ $http.get('/api/profiles'), $http.get('/api/attendees/' + meetingId) ] )
    .then(function(values) {
		var profiles = values[0].data;
		var attendees = values[1].data;
		for (var i = 0; i < attendees.length; i++){
			totalCostPerSecond += getCostFromProfileId(profiles, attendees[i].profileId) / (8 * 60 * 60);
		}
    });

	$scope.cost = 0;
	var stop = $interval(function() {
		$scope.cost += totalCostPerSecond;
	}, 1000);

	$scope.stopMeeting = function() {
		if (angular.isDefined(stop)) {
      		$interval.cancel(stop);
  			stop = undefined;
		}
	};
});