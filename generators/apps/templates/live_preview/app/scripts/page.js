/*
    Text fields
*/
$(function(){
	$(document).on('focus', 'div.form-group-options div.input-group-option:last-child input', function(){
		var sInputGroupHtml = $(this).parent().html();
		var sInputGroupClasses = $(this).parent().attr('class');
		$(this).parent().parent().append('<div class="'+sInputGroupClasses+'">'+sInputGroupHtml+'</div>');
	});

	$(document).on('click', 'div.form-group-options .input-group-addon-remove', function(){
		$(this).parent().remove();
	});
});

/*
    Selects
*/
$(function(){

	var values = new Array();

	// $(document).on('change', '.form-group-multiple-selects .input-group-multiple-select:last-child select', function(){

	// 	var selectsLength = $('.form-group-multiple-selects .input-group-multiple-select select').length;
	// 	var optionsLength = ($(this).find('option').length)-1;

	// 	if(selectsLength < optionsLength){
	// 		var sInputGroupHtml = $(this).parent().html();
	// 		var sInputGroupClasses = $(this).parent().attr('class');

	// 		$(this).parent().parent().append('<div class="'+sInputGroupClasses+'">'+sInputGroupHtml+'</div>');
	// 	}

	// 	updateValues();

	// });

	$(document).on('change', '#dataSourceSelection', function(){

		//updateValues();
		var data = sap.zen.sdk.mock.listCannedData()[0].data;
		window.sdkcomponent.setProperty("data", data);

	});

	$(document).on('click', '.input-group-addon-remove', function(){
		$(this).parent().remove();
		updateValues();
	});

	function updateValues()
	{
		values = new Array();
		//sdkcomponent.setProperty("color","green");
		$('.form-group-multiple-selects .input-group-multiple-select select').each(function(){
			var value = $(this).val();
			if(value != 0 && value != ""){
				sdkcomponent.setProperty("color","green");
				values.push(value);
			}
		});

		$('.form-group-multiple-selects .input-group-multiple-select select').find('option').each(function(){
			var optionValue = $(this).val();
			var selectValue = $(this).parent().val();
			if(in_array(optionValue,values)!= -1 && selectValue != optionValue)
			{
				$(this).attr('disabled', 'disabled');
			}
			else
			{
				$(this).removeAttr('disabled');
			}
		});
	}

	function in_array(needle, haystack){
		var found = 0;
		for (var i=0, length=haystack.length;i<length;i++) {

			if (haystack[i] == needle) return i;
			found++;
	    }
	    return -1;
	}

	// Properties template
	var source   = $("#properties-template").html();
	var template = Handlebars.compile(source);
	var context = {properties: sdkcomponent.properties};
	var html    = template(context);
	$("#properties-list").append(html);

	$("#properties-form").on("submit", function(e) {
		e.stopPropagation(true);
		e.preventDefault(true);
		$(".js-component-property").each(function() {
			var name = $(this).attr("name"),
				value = $(this).val();
			sdkcomponent[name](value);
		});
		sdkcomponent.afterUpdate();
	});

});