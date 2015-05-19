/*global sap, _, $, console */

window.sap = window.sap || {};
sap.designstudio = sap.designstudio || {};
sap.designstudio.sdk = sap.designstudio.sdk || {};

sap.designstudio.sdk.Component = {

	subclass: function(name, mixinFn) {
		'use strict';

		var ctx = {},
			properties;

		ctx.afterUpdate = _.noop;
		ctx.init = _.noop;

		ctx.$ = function() {
			return $('#component-div');
		};

		ctx.fireEvent = function() {
			var timeCell = '<td>' + new Date().toLocaleTimeString() + '</td>',
				eventCell = '<td>' + JSON.stringify(arguments) + '</td>';
			$('#event-table').append('<tr>' + timeCell + eventCell + '</tr>');
		};

		ctx.firePropertiesChangedAndEvent = function() {
			console.log('firePropertiesChangedAndEvent', arguments);
		};

		ctx.setProperty = function(name, value) {
			ctx[name](value);
		};

		ctx.getProperty = function(name) {
			ctx[name]();
		};

		properties = _.functions(ctx);
		mixinFn.apply(ctx);
		ctx.properties = _.difference(_.functions(ctx), properties);

		ctx.init();
		ctx.afterUpdate();

		window.sdkcomponent = ctx;
	}
};

