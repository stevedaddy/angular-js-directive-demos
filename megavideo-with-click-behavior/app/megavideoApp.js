angular.module('megaVideoDemo', []).
	controller('MegaVideoController', function($scope, $element, $attrs) {
		var videoPlayer = $element.find('video')[0];
		$scope.video =  {
			play: function() {
				videoPlayer.play();
				$scope.videoStatus = 'play';
			},
			pause: function() {
				videoPlayer.pause();
				$scope.videoStatus = 'pause';
			},
			stop: function() {
				videoPlayer.pause();
				videoPlayer.currentTime = 0;
				$scope.videoStatus = 'stop'
            },
            togglePlay: function() {
                $scope.videoStatus == 'play' ? this.pause() : this.play();
            },
        	width: $attrs.width,
        	height: $attrs.height
        };
        var ctrl = this;
        ctrl.play = $scope.video.play;
 		ctrl.pause = $scope.video.pause;
 		ctrl.stop = $scope.video.stop;       
    })
	.directive('megaVideo', function($sce) {
		return {
			restrict: 'E',
			templateUrl: 'mega-video.html',
			scope: true,
			link: function(scope, element, attrs) {
				scope.sources = [];
				function processSources(){
					var sourceTypes = {
						webm: { type: 'video/webm'},
						mp4: { type: 'video/mp4'},
						ogg: { type: 'video/ogg'}
					}
					for (source in sourceTypes) {
						if (attrs.hasOwnProperty(source)) {
							scope.sources.push(
								{ type: sourceTypes[source].type, 
								  src: $sce.trustAsResourceUrl(attrs[source])
								}
							);
						}
					}
					
				}
				processSources();
			},
			controller: 'MegaVideoController'
		};
    })
	.directive('megaVideoButton', function() {
		return {
			restrict: 'A',
			require: "^megaVideo",
			link: function(scope, element, attrs, megaVideoController) {
				element.on('click', function(){
					fn = megaVideoController[attrs.action]
					fn();
				})
			}
		}
	})
