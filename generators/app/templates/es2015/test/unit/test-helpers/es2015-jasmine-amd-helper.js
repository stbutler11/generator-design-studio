/*global _ */
(function(global, undefined) {
    'use strict';

    var originalDescribe = global.describe,
        orignalRequire = global.require,
        requireMap = {};

    function describeWrapper(name, describeFunction) {
        originalDescribe(name, function() {
            beforeEach(loadDeferredModules);
            describeFunction.apply(this);
        });
    }

    function loadDeferredModules(done) {
        var keys = _.keys(requireMap);
        orignalRequire(keys, function() {
            var keyToResolved = _.object(keys, arguments);
            _.each(keyToResolved, function(resolved, key){
                _.extend(requireMap[key], resolved);
            });
            done();
        });
    }

    function deferredRequire() {
        var retValue;
        if (arguments.length === 1 && _.isString(arguments[0])) {
            retValue = { '__esModule': true };
            requireMap[arguments[0].slice(0, '.js'.length * -1)] = retValue;
        } else {
            retValue = orignalRequire.apply(null, arguments);
        }
        return retValue;
    }

    global.require = deferredRequire;
    global.describe = describeWrapper;

})(this);