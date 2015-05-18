/*global sap */

window.sap = window.sap || {};
sap.designstudio = sap.designstudio || {};
sap.designstudio.sdk = sap.designstudio.sdk || {};

sap.designstudio.sdk.Component = {

	subclass: function(name, mixinFn) {
		'use strict';

		var ctx = {};

		ctx.$ = function() {
			return $('#componentDiv');
		};

		ctx.fireEvent = function() {
			console.log('fireEvent', arguments);
		};

		ctx.firePropertiesChangedAndEvent = function() {
			console.log('firePropertiesChangedAndEvent', arguments);
		};

		ctx.setProperty = function(name, value) {
			ctx[name](value);
			ctx.afterUpdate(); // ???
		};

		ctx.getProperty = function(name) {
			ctx[name]();
		};

		mixinFn.apply(ctx);
		ctx.init();
		ctx.afterUpdate();

		window.sdkcomponent = ctx;
	}
};

