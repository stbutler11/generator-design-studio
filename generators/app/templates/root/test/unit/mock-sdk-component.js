/*global sap */
window.sap = window.sap || {};
sap.designstudio = sap.designstudio || {};
sap.designstudio.sdk = sap.designstudio.sdk || {};

sap.designstudio.sdk.Component = {

	subclass: function(name, mixinFn) {
		'use strict';

		sap.designstudio.sdk.componentFunction = mixinFn;
	}
};