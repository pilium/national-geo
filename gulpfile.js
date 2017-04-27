var gulp = require('gulp'),
    includer = require('gulp-htmlincluder'),
    replace = require('gulp-html-replace'),
    less = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect');

gulp.task('connect', function(){
    connect.server({
        root: 'build/',
        livereload: true
    });
});

gulp.task('html', function(){
	gulp.src('dev/**/*.html')
        .pipe(includer())
        .pipe(replace({
            css : './css/general.css',
            resetcss : './css/reset.css',
        }))
        .pipe(gulp.dest('build/'))
        .pipe(connect.reload());
});

gulp.task('less', function(){
	gulp.src('dev/less/general.less')
	  .pipe(sourcemaps.init())
	  .pipe(less())
	  .pipe(sourcemaps.write())
	  .pipe(gulp.dest('build/css/'))
      .pipe(connect.reload());;
});
gulp.task('default', function(){
    gulp.start('connect', 'html', 'less');

    gulp.watch(['dev/**/*.html'], function(event) {
        gulp.start('html');
    });
    gulp.watch(['dev/less/**/*.less'], function(event) {
        gulp.start('less');
    });
});