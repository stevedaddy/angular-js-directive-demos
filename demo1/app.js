var app = angular.module('myApp', []);

app.directive('yoYo', function() {
	return {
		template: '<div class="yo"><strong>Yo!</strong></div>',
		restrict: 'AE',
	}
});
