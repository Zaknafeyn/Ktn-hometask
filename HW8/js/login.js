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
	togleSections("list");

	$("#user-info>*").removeClass("hidden").addClass("loggedin");
	$("#user-greeting-nav a").text("Logged in as " + userName);
	$("#login-nav").hide();
	$("#signup-nav").hide();

	// show list of users
	$.ajax({
			url: "http://api.sudodoki.name:8888/users", 
			type: "GET",
			error: function(xhr, status) {
				alert("error: " + status);
			},
			success:function(data){
				var len = data.length;
				for(var i=0; i<len; i++){

				};
				
				alert("len: " + len);
			},
			beforeSend: function() {
				$('#loading').show();
			},
			complete: function(){
				$('#loading').hide();
			},
		});
}

function proceedLogout(userName, token) {
	togleSections("login");

	$("#user-info>*").removeClass("loggedin").addClass("hidden");
	$("#login-nav").show();
	$("#signup-nav").show();
}