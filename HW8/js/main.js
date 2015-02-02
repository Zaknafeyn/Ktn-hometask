$(document).ready(function(){
	// $("#signup").hide();
	// $("#list").hide();
	// $("#show-full").hide();

	// set events for nav bar
	$("#signup-nav").click(signUpClick);
	$("#login-nav").click(logInClick);
	$("#list-nav").click(listClick);

	$("#logout-nav").click(logoutClick)
	// set default nav-bar state
	togleSections("login");

	// set events for buttons
	// login form
	$("#login a").click(signUpClick);
	$('#login input[type="button"]').click(login);

	$("#login input[type='text'], #login input[type='password']").keypress(function(e){
		if(e.keyCode == 13)
			$("#login input[type='button']").click();
	});

	// signup form
	$("#signup a").click(logInClick);
	$('#signup input[type="button"]').click(signup);

	$("#signup input[type='text'], #signup input[type='password']").keypress(function(e){
		if(e.keyCode == 13)
			$("#signup input[type='button']").click();
	});

});

function signUpClick (e){
	togleSections("signup");
	$("#signup input[name='login']").focus();
}

function logInClick(e){
	togleSections("login");
	$("#login input[name='login']").focus();
}

function listClick(e){
	togleSections("list");
}

function logoutClick(e){
	proceedLogout();
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