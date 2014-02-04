'use strict';

angular.module('payMyMeetingApp')
.controller('homeController', function ($scope) {
})
.controller('createMeetingController', function ($scope) {
})
.controller('showMeetingController', function ($scope) {
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
.controller('joinMeetingController', function ($scope) {
})
.controller('countMeetingCostController', function ($scope) {
});