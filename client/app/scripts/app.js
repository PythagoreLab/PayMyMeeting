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
  })
  .directive('odometer', function () {
    return {
      restrict: 'E',
      scope : {
        endValue : '=value'
      },
      link: function(scope, element) {
        // If you want to change the format, you have to add the necessary
        //  parameters. In this case I am going with the defaults.
        var od = new Odometer({
            el : element[0],
            value : 0,       // default value
            duration: 1000,  // animation speed
        });
        // update the odometer element when there is a 
        // change in the model value.
        scope.$watch('endValue', function() {
          od.update(scope.endValue);
        });
      }
    };
  });
