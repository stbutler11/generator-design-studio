/*global sap, $, _, require */

require(['Handlebars', 'component'], function(Handlebars, component) {

	'use strict';

	var sdkcomponent = component.default; // FIXME Use ES2015 for the live preview as well

	$(function(){

		function updatePropertiesEvent(e) {
			e.stopPropagation(true);
			e.preventDefault(true);
			$('.js-component-property').each(function() {
				var name = $(this).attr('name'),
					value = $(this).val();
				if (value && name === 'data') {
					value = sap.zen.sdk.mock.getCannedData(value).data;
				}
				sdkcomponent.setProperty(name, value);
			});
			sdkcomponent.afterUpdate();
		}

		// Properties template
		var source   = $('#properties-template').html();
		var template = Handlebars.compile(source);
		var properties = _.map(sdkcomponent.properties, function(property) {
			var isData = property === 'data',
				cannedDataSources;
			if (isData) {
				cannedDataSources = _.pluck(sap.zen.sdk.mock.listCannedData(), 'name');
			}
			return {
				'name': property,
				'isData': isData,
				'cannedDataSources': cannedDataSources
			};
		});
		var context = { properties: properties };
		var html    = template(context);
		$('#properties-list').append(html);

		$('#properties-form').on('submit', updatePropertiesEvent);
		$('#properties-form input').on('keypress', function(e) {
			if (e.which === 13) {
				updatePropertiesEvent(e);
			}
		});
		$('#dataSourceSelection').on('change', updatePropertiesEvent);

	});
});