var gulp = require('gulp');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var webserver = require('gulp-webserver');
var gutil = require('gulp-util');
var fs = require('fs');
var prettify = require('gulp-prettify');

gulp.task('default',['webserver']);

gulp.task('webserver', function() {
	gulp.src('./')
		.pipe(webserver({
			livereload: true,
      		directoryListing: { 
      			enable: true,
      		},
      		open: true
		}));
});