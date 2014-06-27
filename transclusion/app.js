var app = angular.module('myApp', []);

app.directive('yoYo', function() {
    return {
        link: function($scope, element, attrs) {
            element.on('click', function() {
                $scope.$apply(function() {
                    //fire the onClick function
                    $scope.$eval(attrs.myClick);
                });
            });
        },
});