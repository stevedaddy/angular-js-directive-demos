angular.module('megaVideoDemo', []).
	directive('megaVideo', function() {
		return {
			restrict: 'E',
			templateUrl: 'mega-video.html',
			scope: true,
			link: function(scope, element, attrs) {
				
				function trustSrc (url){
					return $sce.trustAsResourceUrl(url);
				}

				ctrl.processVideoSources () {
					// whitelist of video formats accepted
					var _sourceTypes = {
						webmSrc: { type: 'video/webm'},
						mp4Src: { type: 'video/mp4'},
						oggSrc: { type: 'video/ogg'}
						// etc...
					}
					// refactor this to go to required controller
					for (srcType in _sourceTypes) {
						if (attrs.hasOwnProperty(srcType)) {
							scope.sources.push(
								{ type: _sourceTypes[srcType].type, 
								  src: trustSrc(attrs[srcType])
								}
							);
						}
					}
				}

				processVideoSources();
				
				// via controller
				scope._videoPlayer = element.find('video')[0];
				
				// set initial scope in controller
				scope.video.width = attrs.hasOwnProperty('width') ? scope.video.width = attrs.width : "";
				scope.video.height = attrs.hasOwnProperty('height') ? scope.video.height = attrs.height : "";
			},
			controller: function($scope, $attrs) {
				var ctrl = this;
				ctrl.play = function() { };
				ctrl.pause = function() { };
				ctrl.stop = function() { };
			$scope.$watch(attrs.status, function(status) {	
				switch(status) {
					case ‘play’: 	ctrl.play(); 	break;
					case ‘pause’: 	ctrl.pause();	break;
					case ‘stop’: 	ctrl.stop();	break;
				}
			});
		},
				$scope.sources = [];
				$scope.video =  {
					play: function() {
						$scope._videoPlayer.play();
						$scope.video.status = 'play';
					},
					pause: function() {
						$scope._videoPlayer.pause();
						$scope.video.status = 'pause';
					},
					stop: function() {
						$scope._videoPlayer.pause();
						$scope._videoPlayer.currentTime = 0;
						$scope.video.status = 'stop'

					},
					togglePlay: function() {
						$scope.video.status == 'play' ? $scope.video.pause() : $scope.video.play();
					}
				};
			},
		}
	});