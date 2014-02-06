'use strict';

angular.module('payMyMeetingApp')
.controller('listMeetingsController', function ($scope, $http) {
	$http.get('/api/meetings').
	success(function (data) {
		$scope.meetings = data;
	}).
	error(function () {
	});
});