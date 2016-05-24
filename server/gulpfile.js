var gulp = require('gulp');
var gulp_concat = require('gulp-concat');
var gulp_jshint = require('gulp-jshint');
var gulp_inject = require('gulp-inject');

var path = {
    scripts: ['js/*.js'],
    templates: ['partials/*.html'],
    css: ['css/*.css']
};

gulp.task('jshint', function () {
    gulp.src(path.scripts)
        .pipe(gulp_jshint('.jshintrc'))
        .pipe(glup_jshint.reporter('default'));
});

gulp.task('index', function () {
    var target = gulp.src('/index.html');
    var sources = glup.src([path.scripts, path.templates, path.css], {read: false});

    return target.pipe(gulp_inject(sources))
                 .pipe(gulp.dest('/'))
});