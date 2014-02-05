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
      .when('/cost/:meetingId', {
        templateUrl: 'views/cost.html',
        controller: 'costMeetingController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
