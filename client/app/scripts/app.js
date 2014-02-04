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
      .when('/meeting', {
        templateUrl: 'views/meeting.html',
        controller: 'showMeetingController'
      })
      .when('/join', {
        templateUrl: 'views/join.html',
        controller: 'joinMeetingController'
      })
      .when('/count', {
        templateUrl: 'views/count.html',
        controller: 'countMeetingCostController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
