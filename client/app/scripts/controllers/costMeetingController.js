'use strict';

angular.module('payMyMeetingApp')
.controller('costMeetingController', function ($scope, $q, $http, $routeParams, $interval) {
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
	}, 2000);

	$scope.stopMeeting = function() {
		if (angular.isDefined(stop)) {
      		$interval.cancel(stop);
  			stop = undefined;
		}
	};
});