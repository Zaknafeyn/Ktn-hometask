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
gulp.task('default',['webserver']);

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