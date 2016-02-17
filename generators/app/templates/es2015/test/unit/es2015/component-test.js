/*global describe */
import MyComponent from 'component';

describe('My Component', () => {

    let myComponent;

    beforeEach(() => {
        let _text;
        let mockJquery = {};
        mockJquery.text = value => {
            if (value) {
                _text = value;
            }
            return _text;
        };
        myComponent = new MyComponent(() => mockJquery);
    });

    it('should have a text property', () => {
        const text = "Some text";
        myComponent.text(text);
        expect(myComponent.text()).toBe(text);
    });

    it('should get y', () => {
        expect(myComponent.y).toBe(45);
    });

});
