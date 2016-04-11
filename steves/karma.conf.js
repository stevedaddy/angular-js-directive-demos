// Karma configuration
// Generated on Mon Apr 11 2016 04:23:47 GMT-0700 (Pacific Daylight Time)

    module.exports = function(config) {
        config.set({
            basePath: '',
            frameworks: ['jasmine'],
            files: [
                'app/bower_components/jquery/dist/jquery.min.js',
                'app/bower_components/angular/angular.min.js',
                'app/bower_components/angular-bootstrap/ui-bootstrap.min.js',
                'app/bower_components/angular-mocks/angular-mocks.js',
                'app/myapp.js',
                'app/myapp.spec.js',
                //'app/*.js',
                //'app/*.spec.js',
                //'app/*.html'
            ],
            exclude: [
            ],
            preprocessors: {
                'scripts/*.html': ['ng-html2js']
            },
            ngHtml2JsPreprocessor: {
                moduleName: 'templates'
            },
            reporters: ['progress'],
            port: 9876,
            colors: true,
            logLevel: config.LOG_INFO,
            autoWatch: true,
            browsers: ['Chrome'],
            singleRun: true
        });
    };