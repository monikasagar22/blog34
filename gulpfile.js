const gulp = require('gulp');

gulp.task('default', function () {
  console.log('Gulp is working!');
});

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');

// Compile SCSS
gulp.task('sass', () => {
  return gulp.src('./scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

// Minify JS
gulp.task('js', () => {
  return gulp.src('./js/**/*.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./js/min'))
    .pipe(browserSync.stream());
});

// Serve with BrowserSync
gulp.task('serve', () => {
  browserSync.init({
    server: './'
  });

  gulp.watch('./scss/**/*.scss', gulp.series('sass'));
  gulp.watch('./js/**/*.js', gulp.series('js'));
  gulp.watch('./*.html').on('change', browserSync.reload);
});

// Default task
gulp.task('default', gulp.series('sass', 'js', 'serve'));
