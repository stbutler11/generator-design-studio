import SdkComponent from 'sap/designstudio/sdk/component';


function Component() {
    this.x = function() {
        return 10;
    };

    this.y = 45;
}

export default SdkComponent.subclass('my.component', Component);