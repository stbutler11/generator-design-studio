/* global define, _*/
(function(global) {

    'use strict';

    define('sap/designstudio/sdk/component', function() {

        function subclass(namespace, mixinFn) {
            var Subclass = createSdkComponent(mixinFn);
            addToNamespace(namespace, Subclass);
            return Subclass;
        }

        function createSdkComponent(mixinFn) {
            return function SdkComponent() {
                if (!this instanceof SdkComponent) {
                    return new SdkComponent();
                }
                mixinFn.apply(this);
            };
        }

        function addToNamespace(namespace, obj) {
            var path = namespace.split('.'),
                functionName = path.pop(),
                currentNode = global,
                leaf = _.reduce(path, function(node, part) {
                    currentNode[part] = currentNode[part] || {};
                    return currentNode[part];
                }, currentNode);
            leaf[functionName] = obj;
        }

        return {
            'subclass': subclass
        };
    });

})(this);
