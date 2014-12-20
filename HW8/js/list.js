function createItem(personObj) {
	// {
 //    "id": "2bc2f8f7fe03f23",
 //    "user": {
 //      "gender": "male",
 //      "name": {
 //        "title": "mr",
 //        "first": "soham",
 //        "last": "patterson"
 //      }
 //    }
 //  }

	var user = personObj.user;
	var name = user.name;

	var resStr = '<li>';
	resStr += '	<div class="person ' + user.gender + '">';
	resStr += '<a  id="' + personObj.id + '" class="url n" href="#show-full"><i>' + name.title + '. </i>' +  name.first + ",&nbsp;" + name.last + '</a>';
	resStr += "</div>";
	resStr += "</li>";

	return resStr;
}

function showUserDetails(userObj){
	$("#show-full").hide();
	$("#show-full *").remove();

	// $("show-full").append("userObj");	
	console.log(userObj);
	var user = userObj.user;

	var name = user.name;
	var location = user.location;
	var gender = user.gender;
	var email = user.email;
	var phone = user.phone;

	var str = "<div>";
	str += "<h2>" + name.title + ". " + name.first + ", " + name.last + "</h2>";
	str += "<section>";
	str += "<h3>Location</h3>";
	str += "Street: " + location.street + ", " + location.city +", " + location.state + ", " + location.zip;
	str += "</section>";
	str += "<section>";
	str += "<h3>Connect with " + (gender === 'male'?'him':'her') + "!</h3>";
	str += '<a href="mailto:' + email + '">' + email + '</a>';
	str += "<br/>";
	str += '<a href="tel:' + phone + '">' + phone + '</a>';
	str += "</section>";
	str += "</div>";

	console.log(str);
	$("#show-full").append(str);	

	$("#show-full").show();
}

function getUserDetails(token, userId){
	$.ajax({
			url: "http://api.sudodoki.name:8888/user/" + userId,
			type: "GET",
			headers: {"SECRET-TOKEN" : token},
			error: function(xhr, status) {
				alert("error: " + status);
			},
			success:function(data){
				console.log(data);
				var jsonArr = JSON.parse(data);
				showUserDetails(jsonArr[0]);
			},
			beforeSend: function() {
				$('#loading').show();
			},
			complete: function(){
				$('#loading').hide();
			},
		});
}

function onClickUserPanel(e) {
	// console.log(e.target.id + ", token = " + getCurrentToken());
	getUserDetails(getCurrentToken(), e.target.id);

}