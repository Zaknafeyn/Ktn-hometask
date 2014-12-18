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
		else{
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