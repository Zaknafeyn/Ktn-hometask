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

	// <li>
	// 			<div class="person female">
	// 				<a class='url n' href="#show-full"><i>Mrs.</i> Did-it, Been-there</a>
	// 			</div>
	// 		</li>
	var user = personObj.user;
	var name = user.name;


	var resStr = '<li>';
	resStr += '	<div class="person ' + user.gender + '">';
	resStr += '<a class="url n" href="#show-full"><i>' + name.title + '.</i>' +  name.first + ",&nbsp;" + name.last + '</a>';
	resStr += "</div>";
	resStr += "</li>";

	return resStr;
}