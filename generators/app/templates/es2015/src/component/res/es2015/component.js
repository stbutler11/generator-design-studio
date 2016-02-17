import SdkComponent from 'sap/designstudio/sdk/component';

function Component() {

    this.text = value => {
        return this.$().text(value);
    };

    this.y = 45;
}

export default SdkComponent.subclass('my.component', Component);