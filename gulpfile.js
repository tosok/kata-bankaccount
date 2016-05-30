var gulp = require('gulp');
var del = require('del');
var cleanCss = require('gulp-clean-css');
var connect = require('gulp-connect');
var inject = require('gulp-inject');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var angularFilesort = require('gulp-angular-filesort');
var ngAnnotate = require('gulp-ng-annotate');
var mainBowerFiles = require('main-bower-files');

gulp.task('connect', ['build'], function() {
    connect.server({
        root: 'dist/',
        livereload: true,
        port: 8080
    });
});

gulp.task('clean', function () {
    return del(['**/*'], {cwd : 'dist/'});
});

gulp.task('build', function() {
    var target = gulp.src('index.html', {cwd : 'src/app'});

    // Html files
    var htmlFiles = gulp.src('**/*.html', {cwd : 'src/app'})
        .pipe(gulp.dest('dist/'));
    // JS files
    var jsFiles = gulp.src('**/*.js', {cwd : 'src/app'})
        .pipe(angularFilesort())
        .pipe(ngAnnotate())
        .pipe(concat('bankaccount.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/'));
    // CSS files
    var cssFiles = gulp.src('**/*.css', {cwd : 'src/themes'})
        .pipe(concat('bankaccount.min.css'))
        .pipe(cleanCss())
        .pipe(gulp.dest('dist/themes'));;

    // Vendors
    var vendorCss = gulp.src(mainBowerFiles({ filter: "**/*.css" }))
        .pipe(gulp.dest('dist/vendors'));
    var vendorJs = gulp.src(mainBowerFiles({ filter: "**/*.js" }))
        .pipe(gulp.dest('dist/vendors'));


    return target
        .pipe(inject(vendorJs, {name : 'vendors', ignorePath: '../../dist/', relative: true}))
        .pipe(inject(vendorCss, {name : 'vendors', ignorePath: '../../dist/', relative: true}))
        .pipe(inject(jsFiles, {ignorePath: '../../dist/', relative: true}))
        .pipe(inject(cssFiles, {ignorePath: '../../dist/', relative: true}))
        .pipe(gulp.dest('dist'));
});


gulp.task('default', ['connect']);