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
			// statusCode: {
   //  			403: function() {
   //    				addError("Invalid login or password!", loginSel);
			// 		addError("Invalid login or password!", passSel);
			// 		$(loginSel).focus();
   //  			},

   //  		},
			error: function(xhr, status) {
				addError("Invalid login or password!", loginSel);
				addError("Invalid login or password!", passSel);
				$(loginSel).focus();
			},
			success:function(data){
				removeError(passSel);
				removeError(loginSel);
				// console.log("Successful login");

				var responseData = JSON.parse(data);

				// console.log("Status: " + responseData.status);
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

function proceedLogout(userName, token) {
	togleSections("login");

	$("#user-info>*").removeClass("loggedin").addClass("hidden");
	$("#login-nav").show();
	$("#signup-nav").show();
}