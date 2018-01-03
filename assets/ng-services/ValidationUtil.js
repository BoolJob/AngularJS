/**
 * Validation Utilities Service
 */

var app = angular.module('app');

app.service('ValidationUtil', function() {

	/**
	 * RUT format and DV (checksum) validation
	 */
	this.validateRUT = function (rutId) {
		if (!/^[0-9]+-[0-9kK]{1}$/.test(rutId))
			return false;

		var tmp = rutId.split('-');
		var digv = tmp[1];
		var rut = tmp[0];
		if (digv == 'K') digv = 'k';
		return (this.dv(rut) == digv);
	};

	/**
	 * RUT Validator Digit calculation
	 */
	this.dv = function (T) {
		var M = 0,
			S = 1;
		for (; T; T = Math.floor(T / 10))
			S = (S + T % 10 * (9 - M++ % 6)) % 11;
		return S ? S - 1 : 'k';
	};

	/**
	 * Phone Number Validation
	 */
	this.validatePhone = function (phone) {
		if (/^[\+]?[\d\-\(\)\' ']{7,20}$/.test(phone))
			return true;
	};

});