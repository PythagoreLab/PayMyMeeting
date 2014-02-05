'use strict';

angular.module('payMyMeetingApp')
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
		$log.log('socket connection open');
	};

	sock.onmessage = function(e) {
		$log.log('socket message ' + e.data);
	};

	sock.onclose = function() {
		$log.log('socket connection closed');
	};
});