/*global sap, _ */
describe('Component properties', function() {

    'use strict';

    var component,
        $mockDiv;

    beforeEach(function() {
        component = {};
        sap.designstudio.sdk.componentFunction.apply(component);
        $mockDiv = {
            'css': _.noop
        };
        component.$ = function() {
            return $mockDiv;
        };
        spyOn($mockDiv, 'css');
    });

    it('should set the color', function() {
        component.color('red');
        expect($mockDiv.css).toHaveBeenCalledWith('background-color', 'red');
    });

    it('should get the color', function() {
        component.color();
        expect($mockDiv.css).toHaveBeenCalledWith('background-color');
    });
});
