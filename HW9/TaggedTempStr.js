'use strict';
// count-to-6 run TaggedTempStr.js
// count-to-6 verify TaggedTempStr.js

console.log(html`<b>${process.argv[2]} says</b>: "${process.argv[3]}"`);

function replaceAll(find, replace) {

}	

function html(arr, ...subst) {
	var result = arr[0];

	for (var i = 0; i < subst.length; ++i) {
		result += subst[i]
					.split('&').join("&amp;")
					.split("'").join("&#39;")
					.split('"').join("&quot;")
					.split('<').join("&lt;")
					.split('>').join("&gt;")
		 + arr[i + 1];
	}

	return result;
}