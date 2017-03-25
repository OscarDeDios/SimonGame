/*
* Dependencies
*/
var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  cleanCSS = require('gulp-clean-css'),
  sass = require('gulp-sass'),
  postcss      = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  browserSync = require('browser-sync').create();

config = {
  jsDir : "./dev/js/*.js",
  cssDir : "./dev/css/*.css",
  sassDir : "./dev/sass/*.scss",
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
    gulp.src("./dev/index.html")
      .pipe(gulp.dest(config.buildDir));
});

gulp.task('sass', function () {
     gulp.src(config.sassDir)
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([ autoprefixer() ]))
    .pipe(gulp.dest('./dev/css'));
});

// Build the production code
gulp.task('build', ['miniJs','sass','minicss','copyFiles']);


// Start Server and automatic sync with the browser
gulp.task('dev', function() {
    browserSync.init({
        server: {
            baseDir: "./dev/"
        }
    });


    gulp.watch([config.jsDir,"./dev/index.html"], browserSync.reload);
    gulp.watch([config.sassDir], ['sass', browserSync.reload]);

});
