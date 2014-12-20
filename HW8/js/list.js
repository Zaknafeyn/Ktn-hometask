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

	// console.log(userObj);
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
	}

	$.ajax({
			url: "http://api.sudodoki.name:8888/user/" + userId,
			type: "GET",
			headers: {"SECRET-TOKEN" : token},
			error: function(xhr, status) {
				alert("error when retrieving details for user " + userId + ". Server status: " + status);
			},
			success:function(data){
				// console.log(data);
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

function setActiveItem(itemId) {
	// console.log("setting active item")
	$("#list div.person").removeClass("active-item");
	$("#list div#" + itemId).addClass("active-item");
}

function onClickUserPanel(e) {
	getUserDetails(getCurrentToken(), e.target.id);

}