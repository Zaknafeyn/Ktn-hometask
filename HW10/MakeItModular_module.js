var fs = require('fs');

module.exports = function (path, ext, callback) {
	var dotext = "." + ext;
	fs.readdir(path, function(err, list){
		if (err) return callback(err);

		// console.log("path: %s, ext: %s, list count: %s", path, ext, list.length);

		var filteredFiles = [];
		list.forEach(function(file){
			if (endsWith(file, dotext)){
				filteredFiles.push(file);
			}
		});

		callback(null, filteredFiles);
	});
}

function endsWith(str, suffix) {
	return str.indexOf(suffix, str.length - suffix.length) !== -1;
}