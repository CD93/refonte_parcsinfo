var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var uglify = require('gulp-uglify');
var del = require('del');
var runSequence = require('run-sequence');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var critical = require('critical');
var modernizr = require('gulp-modernizr');
var requirejsOptimize = require('gulp-requirejs-optimize');
var cache = require('gulp-cache');

gulp.task('sass', function(){
  return gulp.src('spip/squelettes/scss/*.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('spip/squelettes/css'))
    .pipe(browserSync.reload({
          stream: true
        }))
});
gulp.task('watch',['browserSync','sass'], function(){
  gulp.watch('spip/squelettes/scss/*.scss', ['sass']); 
  gulp.watch('spip/squelettes/**/*.html', ['clear',browserSync.reload]); 
  gulp.watch('spip/squelettes/js/**/*.js', browserSync.reload);
  // autres observations
});
gulp.task('clear', function (done) {
  return cache.clearAll(done);
});
gulp.task('cleancache', function() {
  del('spip/tmp/cache');
})
gulp.task('cleancompile', function() {
  del('spip/squelettes-compil');
})
gulp.task('uglify',function() {
	return gulp.src('spip/squelettes/js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('spip/squelettes-compil/js'))

});

gulp.task('images', function(){
  return gulp.src('spip/squelettes/images/**/*.+(png|jpg|gif|svg)')
  .pipe(imagemin())
  .pipe(gulp.dest('spip/squelettes-compil/images'))
});
gulp.task('browserSync', function() {
  browserSync({
    proxy: "http://mdph:80"
  })
});
gulp.task('autoprefixer',function() {
	return gulp.src('spip/squelettes/css/*.css')
	.pipe(autoprefixer({
	            browsers: ['last 2 versions'],
	            cascade: false
	        }))
	.pipe(gulp.dest('spip/squelettes-compil/css'))
});
gulp.task('minify-css', function() {
  return gulp.src('spip/squelettes-compil/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('spip/squelettes-compil/css'));
});
gulp.task('copieHTML', function() {
  return gulp.src('spip/squelettes/**/*.html')
  .pipe(gulp.dest('spip/squelettes-compil/'))
});

gulp.task('copiePHP', function() {
  return gulp.src('spip/squelettes/**/*.php')
  .pipe(gulp.dest('spip/squelettes-compil/'))
});
gulp.task('copieFonts', function() {
  return gulp.src('spip/squelettes/fonts/*')
  .pipe(gulp.dest('spip/squelettes-compil/fonts/'))
});
gulp.task('clean', function() {
  del('spip/squelettes/css/*');
  del('spip/squelettes/js/*');
});
gulp.task('modernizr', function() {
  gulp.src('spip/squelettes/js/**/*.js')
    .pipe(modernizr())
    .pipe(uglify())
    .pipe(gulp.dest("spip/squelettes/js/build/"))
});
gulp.task('require', function () {
    return gulp.src('spip/squelettes/js/**/*.js')
        .pipe(requirejsOptimize())
        .pipe(gulp.dest('spip/squelettes/js/build/'));
});
gulp.task('Csommaire', function () {
    critical.generate({
        inline: false,
        base: 'spip',
        css: ['spip/squelettes/css/styles.css'],
        ignore: ['@font-face'],
        src: 'squelettes/sommaire.html',
        dest: 'squelettes-compil/css/sommaire.css',
        minify: true,
        width: 500,
        height: 800
       });
});
gulp.task('Carticle', function () {
    critical.generate({
        inline: false,
        base: 'spip',
        css: ['spip/squelettes/css/styles.css'],
        ignore: ['@font-face'],
        src: 'squelettes/article.html',
        dest: 'squelettes-compil/css/article.css',
        minify: true,
        width: 500,
        height: 800
       });
});
gulp.task('Crubrique', function () {
    critical.generate({
        inline: false,
        base: 'spip',
        css: ['spip/squelettes/css/styles.css'],
        ignore: ['@font-face'],
        src: 'squelettes/rubrique.html',
        dest: 'squelettes-compil/css/rubrique.css',
        minify: true,
        width: 500,
        height: 800
       });
});
gulp.task('Crecherche', function () {
    critical.generate({
        inline: false,
        base: 'spip',
        css: ['spip/squelettes/css/styles.css'],
        ignore: ['@font-face'],
        src: 'squelettes/recherche.html',
        dest: 'squelettes-compil/css/recherche.css',
        minify: true,
        width: 500,
        height: 800
       });
});

// les actions //

gulp.task('build', function (callback) {
  runSequence('cleancompile','sass','autoprefixer',
  ['uglify', 'minify-css'],'Csommaire','Carticle','Crubrique','Crecherche','copieHTML','copieFonts','copiePHP','images',
  callback
  )
});
gulp.task('default', function (callback) {
  runSequence(['clear','sass','browserSync', 'watch','cleancache'],
  callback
  )
});
gulp.task('run', function (callback) {
  runSequence('autoprefixer',['uglify', 'minify-css'],'browserSync',
  callback
  )
});

