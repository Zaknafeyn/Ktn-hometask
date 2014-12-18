var gulp = require('gulp');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var webserver = require('gulp-webserver');
var gutil = require('gulp-util');
var fs = require('fs');
var prettify = require('gulp-prettify');
var sass = require('gulp-sass');
var watch = require('gulp-watch');

gulp.task('default', ['webserver','watch-js']);

//end build pages for HW2

gulp.task('webserver', function() {
	gulp.src(['./'])
		.pipe(webserver({
			livereload: true,
			directoryListing: {
				enable: true,
			},
			open: true
		}));
});

gulp.task('concat-js', function() {
  gulp.src('./js/*.js')
    .pipe(concat('solution.all.js'))
    .pipe(gulp.dest('./dist/js/'))
});

gulp.task('watch-js', function() {
    gulp.watch('./js/**/*.js',['concat-js']);
});