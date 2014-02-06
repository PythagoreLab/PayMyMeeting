'use strict';

angular.module('payMyMeetingApp')
.controller('showMeetingController', function ($scope, $http, $routeParams, $log, $window) {

	$scope.meetingId = $routeParams.meetingId;
	$scope.joinURL = $window.location.protocol + "//" + $window.location.hostname + ":" + $window.location.port + "/#/join/" + $scope.meetingId;

	var loadAttendees = function(showToast){
		$http.get('/api/attendees/' + $scope.meetingId).
		success(function (data) {
			var oldLength = ($scope.attendees !== undefined) ? $scope.attendees.length : 0;
			
			$scope.attendees = data;

			if (showToast && data.length !== oldLength){
				toastr.info(data[data.length -1].name + ' has just joined the meeting !');
			}
		}).
		error(function () {
		});
	};

	loadAttendees(false);

	var sock = new SockJS('/notifications');

	sock.onopen = function() {
		$log.log('socket connection open');
	};

	sock.onmessage = function() {
		console.log('load');
		loadAttendees(true);
	};

	sock.onclose = function() {
		$log.log('socket connection closed');
	};
});