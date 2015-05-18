/* global sap, _ */
(function( undefined) {

	'use strict';

	var cannedDataRegistry = {};

	window.sap = window.sap || {};
	sap.zen = sap.zen || {};
	sap.zen.sdk = sap.zen.sdk || {};
	sap.zen.sdk.mock = sap.zen.sdk.mock || {};

	/**
	 * @param options Contains 3 properties
	 *    name
	 *    description
	 *    data
	 */
	sap.zen.sdk.mock.registerCannedData = function(options) {
		cannedDataRegistry[options.name] = options;
	};

	sap.zen.sdk.mock.getCannedData = function(name) {
		return cannedDataRegistry[name];
	};

	sap.zen.sdk.mock.listCannedData = function() {
		return _.values(cannedDataRegistry);
	};

})();