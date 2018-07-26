var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var minifyCSS = require('gulp-csso');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        proxy: "https://parcs2018.local"
    });

    gulp.watch("spip/squelettes/scss/*.scss", ['sass']);
    gulp.watch("spip/squelettes/**/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("spip/squelettes/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("spip/squelettes/css"))
        .pipe(browserSync.stream());
});
// concat les js !!
gulp.task('js', function(){
    return gulp.src('spip/squelettes/js/*.js')
      .pipe(sourcemaps.init())
      .pipe(concat('app.min.js'))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('spip/squelettes/js'))
  });
// traite les css
gulp.task('css', function(){
    return gulp.src('spip/squelettes/scss/*.scss')
      .pipe(sass())
      .pipe(minifyCSS())
      .pipe(gulp.dest('spip/squelettes/css'))
  });

gulp.task('default', ['serve']);
