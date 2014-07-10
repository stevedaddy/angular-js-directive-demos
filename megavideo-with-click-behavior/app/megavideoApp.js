angular.module('megaVideoDemo', []).
	directive('megaVideo', function($sce) {
		return {
			restrict: 'E',
			templateUrl: 'mega-video.html',
			scope: {},
			link: function(scope, element, attrs) {
				scope.videoPlayer = element.find('video')[0];
				function processSources() {
					var _sourceTypes = {
						webm: { type: 'video/webm'},
						mp4: { type: 'video/mp4'},
						ogv: { type: 'video/ogg'}
						// etc...
					}
					for (source in _sourceTypes) {
						if (attrs.hasOwnProperty(source)) {
							scope.sources.push(
								{ type: _sourceTypes[source].type, 
								  src: $sce.trustAsResourceUrl(attrs[source])
								}
							);
						}
					}
				}
				processSources();
			},
			controller: function($scope, $sce, $attrs) {
				$scope.sources = [];
				$scope.videoPlayer = "";
				$scope.video =  {
					play: function() {
						$scope.videoPlayer.play();
						$scope.video.status = 'play';
						console.log()
					},
					pause: function() {
						$scope.videoPlayer.pause();
						$scope.video.status = 'pause';
					},
					stop: function() {
						$scope.videoPlayer.pause();
						$scope.videoPlayer.currentTime = 0;
						$scope.video.status = 'stop'

					},
					togglePlay: function() {
						$scope.video.status == 'play' ? this.pause() : this.play();
					},
					width: $attrs.width,
					height:$attrs.height,
				};
			},
		}
	});