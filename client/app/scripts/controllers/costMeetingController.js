'use strict';

angular.module('payMyMeetingApp')
.controller('costMeetingController', function ($scope, $q, $http, $routeParams, $interval, $location, $modalDialog) {
	var meetingId = $routeParams.meetingId;
	var totalCostPerSecond = 0;
	var stop;

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

	var resumeMeeting = function() {
		if (!angular.isDefined(stop)){
			stop = $interval(function() {
				$scope.cost += totalCostPerSecond;
			}, 2000);
			$scope.pauseText = 'Pause';
		}
	};
	
	var pauseMeeting = function(){
		if (angular.isDefined(stop)) {
			$interval.cancel(stop);
			stop = undefined;
			$scope.pauseText = 'Resume';
		}
	};

	$scope.stopMeeting = function() {
		$modalDialog.showConfirmDialog('Confirmation', 'Are you sure you want to stop this meeting ?').then(function(value){
			if (value) {
				$location.path('#');
			}
		});
	};
	
	$scope.pauseMeeting = function() {
		if (angular.isDefined(stop)){
			pauseMeeting();
		} else {
			resumeMeeting();
		}
	};

	resumeMeeting();
});