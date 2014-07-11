angular.module('yo.directives', [])
	.directive('yoYo', function() {
	    return {
	        restrict: 'E',
	        template: '<p class="yo-yo">Yo {{ name }}!</p>',
	    };
	});