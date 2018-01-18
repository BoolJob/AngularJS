// Creación del módulo
var angularRoutingApp = angular.module('angularRoutingApp', [
	'ngSanitize', 
	'ngModal',
    'ngRoute',
    'angular-locale-bundles',
	'lbServices',
	'registroModule'
]);

// Configuración de las rutas
angularRoutingApp.config(function($routeProvider) {

	$routeProvider
		.when('/', {
			templateUrl	: 'pages/home.html',
			controller 	: 'mainController'
		})
		.when('/acerca', {
			templateUrl : 'pages/acerca.html',
			controller 	: 'aboutController'
		})
		.when('/contacto', {
			templateUrl : 'pages/contacto.html',
			controller 	: 'contactController'
		})
		.when('/registro', {
			templateUrl : 'app/registro/registro.html',
			controller 	: 'registroController'
		})
		.otherwise({
			redirectTo: '/'
		});
});

angularRoutingApp.controller('mainController', function($scope) {
	$scope.message = 'Hola, Mundo!';
});

angularRoutingApp.controller('aboutController', function($scope) {
	$scope.message = 'Esta es la página "Acerca de"';
});

angularRoutingApp.controller('contactController', function($scope) {
	$scope.message = 'Esta es la página de "Contacto", aquí podemos poner un formulario';
});