var gulp = require('gulp'),
    concat = require('gulp-concat'),
    //uglify = require('gulp-uglify'),
   // sourcemaps = require('gulp-sourcemaps'),
    del = require('del'),
    inject = require('gulp-inject'),
    event = require('event-stream');
    //streams = require('stream-series'),
    //angularFilesort = require('gulp-angular-filesort'),
    //browserify = require('browserify'),
    //source = require('vinyl-source-stream'),
    //ngAnnotate = require  ('gulp-ng-annotate'),
    jshint = require('gulp-jshint');

//--------------jshint---------------//
gulp.task('jshint', function() {
    gulp.src(['./**/*.js', '!node_modules/**/*'])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        //.pipe(jshint.reporter('fail'))
        ;
});
//--------------clean---------------//
gulp.task('clean', function () {
  return del(['../build/**', '!../build'], {force: true});
});

//--------------function copy()---------------//
function copy()
{
    gulp.src(['node_modules/angular/angular.js', 
              'node_modules/angular-ui-router/release/angular-ui-router.js']).pipe(gulp.dest('../build/lib/'));
    gulp.src(['./jsfiles/*.js']).pipe(gulp.dest('../build/'));
    gulp.src(['./css/*.css']).pipe(gulp.dest('../build/css'));
    gulp.src(['./**/*.html', '!index.html', '!node_modules/**/*']).pipe(gulp.dest('../build'));
}

//--------------build:dev---------------//
gulp.task('build:dev',['clean'], function () {
  var target = gulp.src('index.html');
  
  var sources = gulp.src(['node_modules/angular/angular.js', 
                          'node_modules/angular-ui-router/release/angular-ui-router.js',
                          './jsfiles/**/*.js', './css/**/*.css'], {read: false});
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