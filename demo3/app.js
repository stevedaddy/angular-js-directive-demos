var app = angular.module('myApp', []);

app.directive('megaVideo', function() {
	return {
		restrict: 'A',
		templateUrl: './megavideo.html',
		transclude: true,
		scope: {
			status: '@'
		},
		link: function(scope, element, attrs) {
		    var videoPlayer = element.find('video')[0];
    		scope.$watch(attrs.width, function(width) {
        		angular.element(videoPlayer).css('width', width + "px");
    		});
			scope.$watch(attrs.height, function(height) {
			    angular.element(videoPlayer).css('height', height + "px");
			});
	        scope.$watch(attrs.status, function(status) {
	            switch(status) {
	                case 'play':
	                    videoPlayer.play();
	                	break;
					case 'pause':
	                    videoPlayer.pause();
	                	break;
					case 'stop':
	                    videoPlayer.pause();
						videoPlayer.currentTime = 0;
	                	break;
	            }
	        });
	    }
	}
});