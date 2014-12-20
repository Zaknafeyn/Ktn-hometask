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