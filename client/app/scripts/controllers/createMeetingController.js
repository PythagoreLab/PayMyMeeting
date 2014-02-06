'use strict';

angular.module('payMyMeetingApp')
.controller('createMeetingController', function ($scope, $http, $window, $location, $modalDialog) {
	$scope.createMeeting = function(meeting){
		if (meeting && meeting !== '') {
			$http.post('/api/meetings/', meeting).
			success(function (data) {
				$location.path('/meeting/' + data.id);
			}).
			error(function () {
				$modalDialog.showDialog('Error', 'OOPS ! An error occured while creating the meeting.').then(function() {
					$location.path('/#');
				});
			});
		}
	};
});