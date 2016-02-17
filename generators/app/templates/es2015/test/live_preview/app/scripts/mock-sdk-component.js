/*global define, _, $ */

define('sap/designstudio/sdk/component', [], function() {

    'use strict';

    return {

        subclass: function(name, mixinFn) {

            var EVENT = 'event',
                PROPERTIES_CHANGED = 'propertiesChanged',
                ctx = {},
                properties,
                oldPropertyValues = {},
                propertyChanged = function(name, value) {
                    var changed = false;
                    if (value && value !== oldPropertyValues[name]) {
                        changed = true;
                    } else if (!value && oldPropertyValues[name]) {
                        changed = true;
                    }
                    return changed;
                },
                updateActionTable = function(type, value) {
                    var timeCell = '<td>' + new Date().toLocaleTimeString() + '</td>',
                        typeName = type === EVENT ? 'Event' : 'Properties Changed',
                        typeCell = '<td>' + typeName + '</td>',
                        eventCell = '<td>' + value + '</td>';
                    $('#event-table').append('<tr class="' + type + '">' + timeCell + typeCell + eventCell + '</tr>');
                };

            ctx.afterUpdate = _.noop;
            ctx.init = _.noop;

            ctx.$ = function() {
                return $('#component-div');
            };

            ctx.$.browser = $.browser;

            ctx.fireEvent = function(e) {
                updateActionTable(EVENT, e);
            };

            ctx.firePropertiesChanged = function(properties) {
                updateActionTable(PROPERTIES_CHANGED, properties.join(','));
            };

            ctx.firePropertiesChangedAndEvent = function(properties, e) {
                updateActionTable(PROPERTIES_CHANGED, properties.join(','));
                updateActionTable(EVENT, e);
            };

            ctx.setProperty = function(name, value) {
                if (propertyChanged(name, value)) {
                    ctx[name](value);
                }
            };

            ctx.getProperty = function(name) {
                ctx[name]();
            };

            properties = _.functions(ctx);
            mixinFn.apply(ctx);
            ctx.properties = _.difference(_.functions(ctx), properties);

            ctx.init();
            ctx.afterUpdate();
            return ctx;
        }
    };
});