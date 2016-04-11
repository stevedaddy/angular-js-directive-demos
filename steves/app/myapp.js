module = angular.module('app', []);
module.directive('optIn', function() {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: './home/home.html',
        replace: true
    }
});
module.directive('showErrors', function ($timeout, showErrorsConfig) {
        var getShowSuccess, linkFn;
        getShowSuccess = function (options) {
            var showSuccess;
            showSuccess = showErrorsConfig.showSuccess;
            if (options && options.showSuccess != null) {
                showSuccess = options.showSuccess;
            }
            return showSuccess;
        };
        linkFn = function (scope, el, attrs, formCtrl) {
            var blurred, inputEl, inputName, inputNgEl, options, showSuccess, toggleClasses;
            blurred = false;
            options = scope.$eval(attrs.showErrors);
            showSuccess = getShowSuccess(options);
            inputEl = el[0].querySelector('[name]');
            inputNgEl = angular.element(inputEl);
            inputName = inputNgEl.attr('name');
            if (!inputName) {
                throw 'show-errors element has no child input elements with a \'name\' attribute';
            }
            inputNgEl.bind('blur', function () {
                blurred = true;
                return toggleClasses(formCtrl[inputName].$invalid);
            });
            scope.$watch(function () {
                return formCtrl[inputName] && formCtrl[inputName].$invalid;
            }, function (invalid) {
                if (!blurred) {
                    return;
                }
                return toggleClasses(invalid);
            });
            scope.$on('show-errors-check-validity', function () {
                return toggleClasses(formCtrl[inputName].$invalid);
            });
            scope.$on('show-errors-reset', function () {
                return $timeout(function () {
                    el.removeClass('has-error');
                    el.removeClass('has-success');
                    return blurred = false;
                }, 0, false);
            });
            return toggleClasses = function (invalid) {
                el.toggleClass('has-error', invalid);
                if (showSuccess) {
                    return el.toggleClass('has-success', !invalid);
                }
            };
        };
        return {
            restrict: 'A',
            require: '^form',
            compile: function (elem, attrs) {
                if (!elem.hasClass('form-group')) {
                    throw 'show-errors element does not have the \'form-group\' class';
                }
                return linkFn;
            }
        };
    }
);
module.directive('sync', function(){
    return {
        restrict: 'A',
        link: function(scope, elem, attrs){
            sync(scope, scope.$parent, attrs.ngModel);

            /* keep a property in sync between two scopes */
            function sync(a, b, prop){
                a.$watch(prop, update(b));
                b.$watch(prop, update(a));
                function update(s){
                    return function(){
                        if(this.last !== s[prop]) s[prop] = this.last;
                    };
                }
            }
        }
    };
});
module.provider('showErrorsConfig', function () {
    var _showSuccess;
    _showSuccess = false;
    this.showSuccess = function (showSuccess) {
        return _showSuccess = showSuccess;
    };
    this.$get = function () {
        return { showSuccess: _showSuccess };
    };
});

module.controller('NewUserController', function($scope) {
    $scope.save = function() {
        $scope.$broadcast('show-errors-check-validity');

        if ($scope.userForm.$valid) {
            alert('Thanks for signing up ' + $scope.userForm.name.$modelValue  + ' (or maybe I should just call you Mr.' + $scope.userForm.lastname.$modelValue + '?). ' +
            'There is still a lot more to do with directives, this form response is good for now. Please verify that the email you submitted is correct: ' + $scope.userForm.email.$modelValue);
            $scope.reset();
        }
    };

    $scope.reset = function() {
        $scope.$broadcast('show-errors-reset');
        $scope.user = { name: '', lastname: '', email: '' };
    }
});
