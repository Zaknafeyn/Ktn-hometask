var gulp = require('gulp');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var webserver = require('gulp-webserver');
var gutil = require('gulp-util');
var fs = require('fs');
var prettify = require('gulp-prettify');

gulp.task('default',['watchHtml', 'webserver']);

// build pages for HW2
var outputDir = './build';
var hwDir = './src/';
var headerPath = hwDir + 'static/header.html';
var footerPath = hwDir + 'static/footer.html';

gulp.task('hw2ConcatIndex', function(){
	concatPage('index');
});

gulp.task('hw2ConcatAbout', function(){
	concatPage('about');
});

gulp.task('hw2ConcatFaq', function(){
	concatPage('faq');
});

gulp.task('hw2ConcatFeedback', function(){
	concatPage('feedback');
});

gulp.task('hw2ConcatContacts', function(){
	concatPage('contacts');
});

gulp.task('hw2ConcatNews', function(){
	concatPage('news');
});

gulp.task('hw2ConcatRegister', function(){
	concatPage('register');
});

function concatPage(fileName){
	console.log(fileName);
	
	var contentFilePath = hwDir + fileName + '_src.html';
	console.log(contentFilePath);
	gulp.src([headerPath, contentFilePath,footerPath])
		.pipe(concat(fileName + '.html'))
		.pipe(gulp.dest(outputDir));
};

gulp.task('watchHtml', function() {
	gulp.watch(hwDir + '**/*.html',['hw2ConcatIndex','hw2ConcatAbout','hw2ConcatFaq','hw2ConcatFeedback','hw2ConcatContacts','hw2ConcatNews','hw2ConcatRegister', 'prettifyHtml']);
});

gulp.task('prettifyHtml', function() {
  gulp.src(outputDir + '/*.html')
    .pipe(prettify({indent_size: 4}))
    .pipe(gulp.dest('./'))
});

//end build pages for HW2

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