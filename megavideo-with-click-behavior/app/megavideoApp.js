angular.module('megaVideoDemo', [])
	.directive('trustSource', function($sce) {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				$sce.trustAsResourceUrl(attrs.src);
			}
		}
	})
	.directive('megaVideo', function() {
		return {
			restrict: 'E',
			templateUrl: 'mega-video.html',
			scope: true,
			transclude: true,
			link: function(scope, element, attrs) {
				var videoPlayer = element.find('video')[0];
				console.log(videoPlayer)
				scope.video =  {
					play: function() {
						videoPlayer.play();
						scope.video.status = 'play';
					},
					pause: function() {
						videoPlayer.pause();
						scope.video.status = 'pause';
					},
					stop: function() {
						videoPlayer.pause();
						scope._videoPlayer.currentTime = 0;
						scope.video.status = 'stop'

					},
					togglePlay: function() {
						scope.video.status == 'play' ? scope.video.pause() : scope.video.play();
					},
					// width: attrs.hasOwnProperty('width') ? this.width = attrs.width : "",
					// height: attrs.hasOwnProperty('height') ? this.height = attrs.height : "",
				};
			},
		}
	});