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

function proceedLogin(userName, token) {
	// show greetings
	$("#userGreeting-nav").removeClass("hidden").addClass("loggedin");
	$("#userGreeting-nav a").text("Logged in as " + userName);
	$("#login-nav").hide();
	$("#signup-nav").hide();
}

function proceedLogout(userName, token) {
	$("#userGreeting-nav").addClass("hidden").removeClass("loggedin");
	$("#login-nav").show();
	$("#signup-nav").show();
}