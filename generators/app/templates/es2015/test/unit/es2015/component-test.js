/*global describe */

import MyComponent from 'src/component/res/es2015/component.js';

describe('My Component', () => {

    let myComponent;

    beforeEach(() => {
        myComponent = new MyComponent();
    });

    it('should get x', () => {
        expect(myComponent.x()).toBe(10);
    });

    it('should get y', () => {
        expect(myComponent.y).toBe(45);
    });

});
