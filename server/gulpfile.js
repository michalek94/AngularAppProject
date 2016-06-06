var gulp = require('gulp');
var gulp_concat = require('gulp-concat');
var gulp_jshint = require('gulp-jshint');
var gulp_inject = require('gulp-inject');
var del = require('del');
var event_stream = require('event-stream');

gulp.task('jshint', function() {
    gulp.src(['./**/*.js', '!node_modules/**/*'])
        .pipe(gulp_jshint('.jshintrc'))
        .pipe(gulp_jshint.reporter('default'));
});

gulp.task('clean', function () {
  return del(['../build/**', '!../build'], {force: true});
});

function copy()
{
    gulp.src(['node_modules/angular/angular.js']).pipe(gulp.dest('../build/node_modules/angular/'));
	gulp.src(['node_modules/angular-ui-router/release/angular-ui-router.js']).pipe(gulp.dest("../build/node_modules/angular-ui-router/release/"));
    gulp.src(['./js/*.js']).pipe(gulp.dest('../build/js'));
    gulp.src(['./css/*.css']).pipe(gulp.dest('../build/css'));
    gulp.src(['./**/*.html', '!index.html', '!node_modules/**/*']).pipe(gulp.dest('../build'));
};

gulp.task('build:dev',['clean'], function () {
    var target = gulp.src('index.html');
    var sources = gulp.src(['node_modules/angular/angular.js', 
                           'node_modules/angular-ui-router/release/angular-ui-router.js',
                          './js/**/*.js', './css/**/*.css'], {read: false});
   copy();
    return target.pipe(gulp_inject(sources)).pipe(gulp.dest('../build/'));
 });

gulp.task('build:prod', ['clean'], function() {
    var jsStream = gulp.src([ 'node_modules/angular/angular.js', 
                              'node_modules/angular-ui-router/release/angular-ui-router.js', 
                              './js/*.js'])
        .pipe(gulp_concat('scripts.js'))
        .pipe(gulp.dest('../build/'));
    var cssStream = gulp.src('css/*.css').pipe(gulp.dest('../build/css/'));
    gulp.src(['./**/*.html', '!index.html', '!node_modules/**/*']).pipe(gulp.dest('../build/'));
    gulp.src('index.html').pipe(gulp_inject(event_stream.merge(jsStream, cssStream), {ignorePath: '../build/'})).pipe(gulp.dest('../build/'));
});