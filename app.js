var app = angular.module('myApp', []);

app.directive('yo', function() {
	return {
		template: '<div class="yo"><strong>Yo!</strong></div>',
		restrict: 'AE',
		replace: true,
	}
});
