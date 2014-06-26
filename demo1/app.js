var app = angular.module('myApp', []);

// app.directive('yoYo', function() {
// 	return {
// 		template: '<div class="yo"><strong>Yo!</strong></div>',
// 		restrict: 'AE',
// 	}
// });

app.directive('yoYo', function() {
    return {
        restrict: 'E',
        template: '<div class="yo-yo">Yo!</div>',
        replace: true
    }
})