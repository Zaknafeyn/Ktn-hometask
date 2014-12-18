$(document).ready(function(){
	// set events for nav bar
	$("#signup-nav").click(signUpClick);
	$("#login-nav").click(logInClick);
	$("#list-nav").click(listClick);

	// set default nav-bar state
	togleSections("login");

	// set events for buttons
	// login form
	$("#login a").click(signUpClick);
	$('#login input[type="button"]').click(login);

	// signup form
	$("#signup a").click(logInClick);
	$('#signup input[type="button"]').click(signup);

});

function signUpClick (e){
	togleSections("signup");
}

function logInClick(e){
	togleSections("login");
}

function listClick(e){
	togleSections("list");
}

function togleSections(sectionToShow){

	cleanupSectionInputs(sectionToShow);
	removeAllErrors(sectionToShow);

	var sections = ["login", "list", "signup"];
	var len = sections.length;
	for(var i = 0; i < len; i++)
	{
		var id = "#" + sections[i];
		var navId = id + "-nav";
		if (sections[i] == sectionToShow)
		{
			$(id).show();
			$(navId).addClass("active")
		}
		else
		{
			$(id).hide();
			$(navId).removeClass("active");
		}
	}
}

function cleanupSectionInputs(section) {
	$("#" + section + " input[type='text']").val("");
	$("#" + section + " input[type='password']").val("");
}