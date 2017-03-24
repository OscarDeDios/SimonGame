/*
* Dependencies
*/
var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  cleanCSS = require('gulp-clean-css'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync').create();

config = {
  jsDir : "./dev/js/*.js",
  cssDir : "./dev/css/*.scss",
  imgDir : "./dev/img/**",
  buildDir : "./build"
};


// JS
gulp.task('miniJs', function () {
  gulp.src(config.jsDir)
  .pipe(concat('main.js'))
  .pipe(uglify())
  .pipe(gulp.dest(config.buildDir + '/js'));
});



//CSS
gulp.task('minicss', function () {
    gulp.src(config.cssDir)
        .pipe(concat('style.css'))
        .pipe(cleanCSS())
  		.pipe(gulp.dest(config.buildDir + '/css'));
});

gulp.task('copyFiles', function () {
    gulp.src(config.imgDir)
      .pipe(gulp.dest(config.buildDir + '/img'))
    gulp.src("./dev/api/**")
      .pipe(gulp.dest(config.buildDir + '/api'));
});

gulp.task('sass', function () {
     gulp.src(config.cssDir)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dev/css'));
});

// Build the production code
gulp.task('build', ['miniJs','minicss','copyFiles']);


// Start Server and automatic sync with the browser
gulp.task('dev', function() {
    browserSync.init({
        server: {
            baseDir: "./dev/"
        }
    });


    gulp.watch([config.jsDir,config.cssDir,"./dev/index.html"], ['sass', browserSync.reload]);

});
