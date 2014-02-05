'use strict';

angular.module('payMyMeetingApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'homeController'
      })
      .when('/create', {
        templateUrl: 'views/create.html',
        controller: 'createMeetingController'
      })
      .when('/meeting/:meetingId', {
        templateUrl: 'views/meeting.html',
        controller: 'showMeetingController'
      })
      .when('/join/:meetingId', {
        templateUrl: 'views/join.html',
        controller: 'joinMeetingController'
      })
      .when('/count/:meetingId', {
        templateUrl: 'views/count.html',
        controller: 'countMeetingCostController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
