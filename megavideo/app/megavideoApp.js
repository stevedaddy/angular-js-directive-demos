angular.module('megaVideoDemo', []).
	directive('megaVideo', function() {
		return {
			restrict: 'E',
			templateUrl: './mega-video.html',
			transclude: true,
			scope: true,
			link: function($scope, element, attrs) {
				$scope._videoPlayer = element.find('video')[0];
				$scope.sources = []

				// whitelist of video formats accepted
				var _sourceTypes = {
					webmSrc: { type: 'video/webm'},
					mp4Src: { type: 'video/mp4'},
					oggSrc: { type: 'video/ogg'}
					// etc...
				}
				for (srcType in _sourceTypes) {
					if (attrs.hasOwnProperty(srcType)) {
						$scope.sources.push(
							{ type: _sourceTypes[srcType].type, 
							  src: attrs[srcType]
							}
						);
					}
				}
			},
			controller: function($scope, $sce) {
				$scope.trustSrc = function(url){
					return $sce.trustAsResourceUrl(url);
				}
			},
		}
	});