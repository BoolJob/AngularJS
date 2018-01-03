/**
 * Basic common services and configuration for every AngularJS application
 * loaded inside a Chromium JavaFX container
 */

var app = angular.module('app');

/**
 * Common Desktop functions 
 */
app.service('BcsDesktop', function($http, $window, $location, LoopBackAuth, UserSession) {

	var me = this;

	this.login = function() {
		if ($location.$$hash) {
			UserSession.login({
				password : $location.$$hash
			}, function(value) {
				// Success
				$http.defaults.headers.common.BcsAuthorization = value.id;
				$http.defaults.headers.common.BcsUser = value.user.id;
			}, function(err) {
				// Error
				me.onLoginError();
			});
		} else {
			me.onLoginError();
		}
	};

	/**
	 * Login error handler
	 */
	this.onLoginError = function() {
		console.log('BcsDesktop.onLoginError');
		// Now clearing the loopback values from client browser for safe logout...
		LoopBackAuth.clearUser();
		LoopBackAuth.clearStorage();

		//TODO: check if there is an error handler service here
		$window.location.href = '/401.html';
	};

});

/**
 * Authentication Interceptor Service
 */
app.factory('DesktopAuthInterceptor', [ '$q', 'LoopBackAuth', function($q, LoopBackAuth) {
	return {
		responseError : function(rejection) {
			if (rejection.status == 401) {
				LoopBackAuth.clearUser();
				LoopBackAuth.clearStorage();

				//TODO: check if there is an error handler service here
				$window.location.href = '/401.html';
			}
			return $q.reject(rejection);
		}
	};
}]);

app.factory('DesktopSessionValidator', ['$q', '$http', '$location', 'BcsDesktop', 'UserSession', 'LoopBackAuth', function($q, $http, $location, BcsDesktop, UserSession, LoopBackAuth) {
	return {
		sessionValidation : function() {
			return $q(function(resolve, reject) {
				if (UserSession.isAuthenticated()) {
					UserSession.getCurrent(function(user) {
						$http.defaults.headers.common.BcsAuthorization = LoopBackAuth.accessTokenId;
						$http.defaults.headers.common.BcsUser = LoopBackAuth.currentUserId;
						resolve({});
					}, function(res) {
						BcsDesktop.onLoginError();
						reject({});
					});
				} else {
					if ($location.$$hash) {
						UserSession.login({
							password : $location.$$hash
						}, function(value) {
							// Success
							$http.defaults.headers.common.BcsAuthorization = value.id;
							$http.defaults.headers.common.BcsUser = value.user.id;
						}, function(err) {
							// Error
							me.onLoginError();
						});
					} else {
						BcsDesktop.onLoginError();
						reject({});
					}
				}
				console.log('DesktopSessionValidator');
			});
		}
	}
}]);

/**
 * Common config
 */
app.config(function($httpProvider) {
	// Security Interceptor
	$httpProvider.interceptors.push('DesktopAuthInterceptor');
})

/**
 * i18n Interceptor
 */
.config(['localeBundleFactoryProvider', function (localeBundleFactoryProvider) {
	// URL pattern to fetch locale bundles.  Placeholders: {{bundle}}
	localeBundleFactoryProvider.bundleUrl('assets/i18n/{{bundle}}.json');

	// URL pattern to fetch locale bundles.  Placeholders: {{bundle}} and {{locale}}
	localeBundleFactoryProvider.bundleLocaleUrl('assets/i18n/{{bundle}}-{{locale}}.json');

	// Add the locale to the 'Accept-Language' header.  Default is true.
	localeBundleFactoryProvider.useAcceptLanguageHeader(true);

	// Cache AJAX requests.  Default is true.
	localeBundleFactoryProvider.enableHttpCache(true);

	// Transform responses.  Default returns 'response.data'.
	localeBundleFactoryProvider.responseTransformer(function (response) {
		return response.data.body;
	});
}]);

/**
 * Run, called before any Controllers
 */
app.run(function(BcsDesktop) {
	console.log('BaseDesktop.run');
	//BcsDesktop.login();
});