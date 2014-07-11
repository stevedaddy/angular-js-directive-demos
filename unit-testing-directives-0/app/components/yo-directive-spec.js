describe("yoDirective", function() {

	var element, 
	 	scope,
	 	html,
	 	compiled;

	beforeEach(module('yo.directives'))

	beforeEach(inject(function($compile, $rootScope){


		html = '<div><yo-yo ng-init="name=\'Willis\'"></yo-yo></div>';
		scope = $rootScope.$new();
		element = angular.element(html);
		compiled = $compile(element)(scope);
		scope.$digest();
	}))

	it('should greet the person', function() {
		expect(element.text()).toContain('Yo');
		expect(element.text()).toContain('Willis');
	})

	it('should add the yo-yo class', function() {
		expect(element.hasClass('yo-yo')).toBe(true);
	})
})