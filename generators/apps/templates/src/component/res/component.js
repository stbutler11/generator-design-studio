/* global sap */
/* jshint strict: false, quotmark:false */
sap.designstudio.sdk.Component.subclass("com.sap.sample.coloredbox.ColoredBox", function() {

	var that = this;

	this.init = function() {
		this.$().addClass("coloredBox");
		this.$().click(function() {
			that.fireEvent("onclick");
		});
	};

	this.color = function(value) {
		if (value === undefined) {
			return this.$().css("background-color");
		} else {
			this.$().css("background-color", value);
			return this;
		}
	};
});
