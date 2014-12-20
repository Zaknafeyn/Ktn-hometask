function createItem(personObj) {

	var user = personObj.user;
	var name = user.name;

	var obj = {
		id : personObj.id,
		title : name.title,
		firstName : name.first,
		lastName : name.last,
		gender : user.gender
	};

	return implementHtmlTemplate("#item-template", obj);
}

function showUserDetails(userObj){
	$("#show-full").hide();
	$("#show-full *").remove();

	var user = userObj.user;

	var name = user.name;
	var location = user.location;
	var gender = user.gender;
	var email = user.email;
	var phone = user.phone;

	var obj = {
		title : name.title,
		firstName : name.first,
		lastName : name.last,
		street : location.street,
		city : location.city,
		state : location.state,
		zip : location.zip,
		treatment : (gender === 'male'?'him':'her'),
		email : email,
		tel : phone
	};

	var result = implementHtmlTemplate("#user-details-template", obj);

	$("#show-full").append(result);

	$("#show-full").show();
}

function implementHtmlTemplate(templateName, dataObj) {
	var source  = $(templateName).html();
	var template = Handlebars.compile(source);
	return template(dataObj);
}

function getUserDetails(token, userId){
	if (userId == '' || userId == undefined)
	{
		alert("User id is invalid. Try again");
		return;
	}

	$.ajax({
			url: "http://api.sudodoki.name:8888/user/" + userId,
			type: "GET",
			headers: {"SECRET-TOKEN" : token},
			error: function(xhr, status) {
				alert("error when retrieving details for user " + userId + ". Server status: " + status);
			},
			success:function(data){
				var jsonArr = JSON.parse(data);
				showUserDetails(jsonArr[0]);
				setActiveItem(userId);
			},
			beforeSend: function() {
				$('#loading').show();
			},
			complete: function(){
				$('#loading').hide();
			},
		});
}

function emptyList() {
	$("#list ul *").remove();
}

function setActiveItem(itemId) {
	$("#list div.person").removeClass("active-item");
	$("#list div#" + itemId).addClass("active-item");
}

function onClickUserPanel(e) {
	getUserDetails(getCurrentToken(), e.target.id);

}
function isLocalStorageAvailable() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}
// -- login
function login() {
	cleanUpErrors("login");

	var loginSel = '#login input[name="login"]';
	var passSel = '#login input[name="password"]';
	var isFocusSet = false;

	var login = $(loginSel).val();
	var password = $(passSel).val();
	if (login == '' || password == '') {
		if (login == ''){
			addError("Empty login is not allowed!", loginSel);

			$(loginSel).focus();
			isFocusSet = true;
		}
		else
			removeError(loginSel);

		if (password == ""){
			addError("Empty password is not allowed!", passSel);
			if (!isFocusSet)
				$(passSel).focus();
		}
		else
			removeError(passSel);
	} 
	else {
		$.ajax({
			url: "http://api.sudodoki.name:8888/login", 
			type: "POST",
			data: {
				login: login,
				password: password
			},
			error: function(xhr, status) {
				addError("Invalid login or password!", loginSel);
				addError("Invalid login or password!", passSel);
				$(loginSel).focus();
			},
			success:function(data){
				removeError(passSel);
				removeError(loginSel);

				var responseData = JSON.parse(data);

				proceedLogin(login, responseData.token);
			},
			beforeSend: function() {
				$('#loading').show();
			},
			complete: function(){
				$('#loading').hide();
			},
		});
	}
}
$(document).ready(function(){
	// $("#signup").hide();
	$("#list-nav").hide();
	// $("#show-full").hide();

	// set events for nav bar
	$("#signup-nav").click(signUpClick);
	$("#login-nav").click(logInClick);
	$("#list-nav").click(listClick);

	$("#logout-nav").click(logoutClick)

	// set default nav-bar state
	togleSections("login");
	$("#login input[name='login']").focus();


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

	// use .on() for dynamically created elements in DOM
	$(document).on('click','#list a.url', onClickUserPanel);

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
	console.log("Proceed logout");
	proceedLogout();
}

function togleSections(sectionToShow){

	cleanupSectionInputs(sectionToShow);
	removeAllErrors(sectionToShow);

	var sections = ["login", "signup"];
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

function proceedLogin(userName, token) {
	// show greetings
	togleSections("list");

	window.config = {
		token : token
	};

	$("#user-info>*").removeClass("hidden").addClass("loggedin");
	$("#user-greeting-nav a").text("Logged in as " + userName);
	$("#login-nav").hide();
	$("#signup-nav").hide();
	$("#list-nav").show();
	$("#list-nav").addClass("active");


	// show list of users
	$.ajax({
			url: "http://api.sudodoki.name:8888/users", 
			type: "GET",
			error: function(xhr, status) {
				alert("error: " + status);
			},
			success:function(data){
				// $("#list ul *").remove();
				emptyList();

				var len = data.length;
				for(var i=0; i<len; i++){
					$("#list ul").append(createItem(data[i]));
				};

				getUserDetails(getCurrentToken(), data[0].id);

			},
			beforeSend: function() {
				$('#loading').show();
			},
			complete: function() {
				$('#loading').hide();
			},
		});
}

function getCurrentToken() {
	return window.config.token;
}

function proceedLogout() {
	togleSections("login");

	// reset token
	window.config = {
		token : ''
	};

	$("#user-info>*").removeClass("loggedin").addClass("hidden");
	$("#login-nav").show();
	$("#signup-nav").show();
	$("#list-nav").hide();

	emptyList();
	$("#list").hide();
	$("#show-full").hide();

}
function addError(message, selector){
	$(selector).addClass("error");
	$('<small class="error">' + message + '</small>').insertAfter(selector);
}

function removeError(selector){
	// removes error class from a selected nodes
	$(selector).removeClass("error");
}
function cleanUpErrorMessages (section){
	cleanUpErrors(section);
}

function cleanUpErrors(section){
	// removes error messages
	$("#" + section + " small").detach();
}

function removeAllErrors(section){
	// removes errors and error messages
	// available sections: login, signup
	$("#" + section + " input").removeClass("error");
	cleanUpErrorMessages(section);
}

function cleanLoginErrors(){
	removeAllErrors("login");
}

function cleanSignupErrors(){
	removeAllErrors("signup");		
}
// -- signup

function signup() {
	cleanUpErrors("signup");

	var loginSel = "#signup input[name='login']";
	var emailSel = "#signup input[name='email']";
	var passSel = "#signup input[name='password']";
	var passConfirmSel = "#signup input[name='passwordConfirmation']";

	var login = $(loginSel).val();
	var email = $(emailSel).val();
	var pass = $(passSel).val();
	var passConfirm = $(passConfirmSel).val();
	var isFocusSet = false;

	if (login == '' || email == '' || pass == "" || passConfirm == "") {
		if (login == '') {
			addError("Empty login is not allowed!", loginSel);
			$(loginSel).focus();
			isFocusSet = true;
		}
		else
			removeError(loginSel);

		if (email == '') {
			addError("Empty email is not allowed!", emailSel);

			if(!isFocusSet) {
				$(emailSel).focus();
				isFocusSet = true;
			}
		}
		else
			removeError(emailSel);

		if (pass == '') {
			addError("Empty password is not allowed!", passSel);
			if(!isFocusSet) {
				$(passSel).focus();
				isFocusSet = true;
			}
		}
		else
			removeError(passSel);

		if (passConfirm == '') {
			addError("Empty password confirmation is not allowed!", passConfirmSel);
			if(!isFocusSet) 
				$(passConfirmSel).focus();
		}
		else
			removeError(passConfirmSel);
	}
	else {
		// validate input
		if (pass !== passConfirm){
			addError("Password confirmation do not match password!", passConfirmSel);
			$(passConfirmSel).focus();
		}
		else if (!isValidEmailAddress(email)){
			addError("Email address is not valid!", emailSel);
			$(emailSel).focus();
		}
		else {
			// post user
			$.ajax({
				url: "http://api.sudodoki.name:8888/signup", 
				type: "POST",
				dataType: "json",
				data: {
					login: login,
					password: pass,
					passwordConfirmation: passConfirm,
					email: email
				},
				error: function(xhr, status) {
					addError("Cannot create user! Server response status: " + status, loginSel);
					$(loginSel).focus();
				},
				success:function(data, status, xhr){
					proceedLogin(login, data.token);
				},
				beforeSend: function() {
					$('#loading').show();
				},
				complete: function(){
					$('#loading').hide();
				},
			});
		}
	}
}

function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailAddress);
};