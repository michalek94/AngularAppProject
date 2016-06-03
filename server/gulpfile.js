var gulp = require('gulp'),
    concat = require('gulp-concat'),
    del = require('del'),
    inject = require('gulp-inject'),
    event = require('event-stream');
    jshint = require('gulp-jshint');

//--------------jshint---------------//
gulp.task('jshint', function() {
    gulp.src(['./**/*.js', '!node_modules/**/*'])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'));
});
//--------------clean---------------//
gulp.task('clean', function () {
  return del(['../build/**', '!../build'], {force: true});
});

//--------------function copy()---------------//
function copy()
{
    gulp.src(['node_modules/angular/angular.js', 
              'node_modules/angular-ui-router/release/angular-ui-router.js']).pipe(gulp.dest('../build/node_modules/'));
    gulp.src(['./js/*.js']).pipe(gulp.dest('../build/'));
    gulp.src(['./css/*.css']).pipe(gulp.dest('../build/css'));
    gulp.src(['./**/*.html', '!index.html', '!node_modules/**/*']).pipe(gulp.dest('../build'));
}

//--------------build:dev---------------//
gulp.task('build:dev',['clean'], function () {
  var target = gulp.src('index.html');
  
  var sources = gulp.src(['node_modules/angular/angular.js', 
                          'node_modules/angular-ui-router/release/angular-ui-router.js',
                          './js/**/*.js', './css/**/*.css'], {read: false});
  copy();
  return target.pipe(inject(sources)).pipe(gulp.dest('../build/'));
});
//--------------build:prod---------------//
gulp.task('build:prod', ['clean'], function() {
    var jsStream = gulp.src([ 'node_modules/angular/angular.js', 
                              'node_modules/angular-ui-router/release/angular-ui-router.js', 
                              './js/*.js'])
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('../build/'));
    var cssStream = gulp.src('css/*.css').pipe(gulp.dest('../build/css/'));
    gulp.src(['./**/*.html', '!index.html', '!node_modules/**/*']).pipe(gulp.dest('../build/'));
    gulp.src('index.html').pipe(inject(event.merge(jsStream, cssStream), {ignorePath: '../build/'})).pipe(gulp.dest('../build/'));
});