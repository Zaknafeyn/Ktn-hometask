function addError(message, selector){
	$(selector).addClass("error");
	$('<small class="error">' + message + '</small>').insertAfter(selector);
}

function removeError(selector){
	// removes error class from a selected nodes
	$(selector).removeClass("error");
}

function cleanUpErrors(section){
	// removes error messages
	$("#" + section + " small").detach();
}

function removeAllErrors(section){
	// removes errors and error messages
	// available sections: login, signup
	$("#" + section + " input").removeClass("error");
	cleanUpErrorMessages(section)
}