'use strict';

angular.module('payMyMeetingApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngAnimate',
  'ui.bootstrap',
  'ja.qr'
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
      .when('/list', {
        templateUrl: 'views/meetings.html',
        controller: 'listMeetingsController'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'homeController'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
.animation('.reveal-animation', function() {
	console.log('te');
  return {
    enter: function(element, done) {
      element.css('display', 'none');
      element.fadeIn(5000, done);
      return function() {
        element.stop();
      };
    },
    leave: function(element, done) {
      element.fadeOut(5000, done);
      return function() {
        element.stop();
      };
    }
  };
})
.factory('$modalDialog', ['$modal', function($modal){
	var showCustomDialog = function(title, content, buttons){
		var modalInstance = $modal.open({
			templateUrl: 'views/modalDialog.html',
			controller: 'modalDialogController',
			resolve: {
				content: function(){
					return {
						title: title,
						content: content,
						buttons: buttons
					};
				}
			}
		});

		return modalInstance.result;
	};

	return {
		showConfirmDialog: function(title, content){
			return showCustomDialog(title, content, ['Yes', 'No']);
		},
		showDialog: function(title, content){
			return showCustomDialog(title, content, ['Ok']);
		}
	};
}])
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
			el: element[0],
			value: 0,       // default value
			duration: 1000  // animation speed
        });
        // update the odometer element when there is a 
        // change in the model value.
        scope.$watch('endValue', function() {
        	od.update(scope.endValue);
        });
    }
};
});
