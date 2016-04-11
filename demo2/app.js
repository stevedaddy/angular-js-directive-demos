var app = angular.module('myApp', []);

app.directive('yoYo', function() {
	return {
		templateUrl: 'yo-template.html',
		restrict: 'AE'
	}
})
.directive('rnStepper', function() {
    return {
        // restrict and template attributes are the same as before.
        // we don't need anymore to bind the value to the external ngModel
        // as we require its controller and thus can access it directly
        scope: {},
        // the 'require' property says we need a ngModel attribute in the declaration.
        // this require makes a 4th argument available in the link function below
        require: 'ngModel',
        // the ngModelController attribute is an instance of an ngModelController
        // for our current ngModel.
        // if we had required multiple directives in the require attribute, this 4th
        // argument would give us an array of controllers.
        link: function(scope, iElement, iAttrs, ngModelController) {
            // we can now use our ngModelController builtin methods
            // that do the heavy-lifting for us

            // when model change, update our view (just update the div content)
            ngModelController.$render = function() {
                iElement.find('div').text(ngModelController.$viewValue);
            };

            // update the model then the view
            function updateModel(offset) {
                // call $parsers pipeline then update $modelValue
                ngModelController.$setViewValue(ngModelController.$viewValue + offset);
                // update the local view
                ngModelController.$render();
            }

            // update the value when user clicks the buttons
            scope.decrement = function() {
                updateModel(-1);
            };
            scope.increment = function() {
                updateModel(+1);
            };
        }
    };
});