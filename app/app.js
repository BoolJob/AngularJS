var app = angular.module('app', [
	'ngSanitize', 
	'ngModal',
    'ngRoute',
    'angular-locale-bundles',
	'lbServices',
	'registroModule'
]);

app.service('ButtonConfigLoader', function($http) {
	this.loadConfig = function(route) {
		console.log('route= ', route);
		// TODO complete me!
        
	}
});

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/registro/registro.html',
            controller: 'registroController'
        })
        .when('/registro', {
            templateUrl: 'app/registro/registro.html',
            controller: 'registroController'
        })
		.otherwise({
			redirectTo: '/'
		});

	//$locationProvider.hashPrefix('!');
	// use the HTML5 History API
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
    $locationProvider.hashPrefix('!');
});

app.run(function($rootScope, ButtonConfigLoader) {

	$rootScope.$on("$routeChangeSuccess", function(evt, next, current) {
		ButtonConfigLoader.loadConfig(next.originalPath);
        
	});
});