var gulp = require('gulp');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var webserver = require('gulp-webserver');
var gutil = require('gulp-util');
var fs = require('fs');

//gulp.task('default',['cssMin','jsUglify', 'watch', 'webserver']);
gulp.task('default',['watchHtml','webserver']);

gulp.task('release', function(){
	var number = gutil.env.number;
	console.log("Number", number);

	if (fs.existsSync('./releases/' + number)) {
		return console.error('Number ' + number + ' already exists');
	}

	console.log('Making release ' + number + '...');
	gulp.src('./dist/**/*.*')
		.pipe(gulp.dest('./releases/' + number + '/'));
});

// build pages for HW2
var outputDir = './dist';
var hw2Dir = './HW2/src/';
var headerPath = hw2Dir + 'static/header.html';
var footerPath = hw2Dir + 'static/footer.html';

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
	
	var contentFilePath = hw2Dir + fileName + '_src.html';
	console.log(contentFilePath);
	gulp.src([headerPath, contentFilePath,footerPath])
		.pipe(concat(fileName + '.html'))
		.pipe(gulp.dest(outputDir));
};

gulp.task('watchHtml', function() {
	gulp.watch(hw2Dir + '**/*.html',['hw2ConcatIndex','hw2ConcatAbout','hw2ConcatFaq','hw2ConcatFeedback','hw2ConcatContacts','hw2ConcatNews','hw2ConcatRegister']);
});

//end build pages for HW2

gulp.task('cssConcat', function(){
	gulp.src('./css/**/*.css')
		.pipe(autoprefixer())
		.pipe(concat('all.css'))
		.pipe(gulp.dest('./dist'));
});

gulp.task('cssMin', function(){
	gulp.src('./css/*.css')
		.pipe(plumber())
		.pipe(cssmin())
		.pipe(concat('all.min.css'))
		.pipe(gulp.dest('./dist'));
});

gulp.task('imageMin', function(){
	gulp.src('./images/**/*.*')
		.pipe(imagemin())
		.pipe(gulp.dest('./dist'));
});

gulp.task('jsUglify', function() {
  gulp.src('./js/**/*.js')
  	.pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'))
});

gulp.task('watch', function() {
	gulp.watch('./css/**/*.css',['cssMin']);
	gulp.watch('./js/**/*.js',['jsUglify']);
});


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