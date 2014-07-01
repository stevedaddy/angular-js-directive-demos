angular.module('megaVideoDemo', []).
    directive('megaVideo', function($sce) {
        return {
            restrict: 'E',
            templateUrl: 'mega-video.html',
            scope: true,
            link: function(scope, element, attrs) {   
                scope.sources = []
                function trustSrc(url){
                    return $sce.trustAsResourceUrl(url);
                }
                // whitelist of video formats accepted
                var _sourceTypes = {
                    webmSrc: { type: 'video/webm'},
                    mp4Src: { type: 'video/mp4'},
                    oggSrc: { type: 'video/ogg'}
                    // etc...
                }
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
            
        }
    });