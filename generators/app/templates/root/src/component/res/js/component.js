sap.designstudio.sdk.Component.subclass("<%= bundle %>.<%= titleLower %>.<%= titleOneWord %>", function() {

	var that = this;

	this.init = function() {
		this.$().addClass("coloredBox");
		this.$().click(function() {
			that.fireEvent("onclick called");
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