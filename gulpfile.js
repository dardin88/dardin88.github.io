const gulp = require('gulp');
const rename = require('gulp-rename');
const terser = require('gulp-terser');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

// Minify CSS
gulp.task('css:minify', function() {
  return gulp.src([
      './css/*.css',
      '!./css/*.min.css'
    ], { allowEmpty: true })
    .pipe(sourcemaps.init())
    .pipe(postcss([autoprefixer()]))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./css'));
});

// Minify JavaScript
gulp.task('js:minify', function() {
  return gulp.src([
      './js/*.js',
      '!./js/*.min.js'
    ], { allowEmpty: true })
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./js'));
});

// Default task
gulp.task('watch', function() {
  gulp.watch(['./css/*.css', '!./css/*.min.css'], gulp.series('css:minify'));
  gulp.watch(['./js/*.js', '!./js/*.min.js'], gulp.series('js:minify'));
});

gulp.task('default', gulp.series('css:minify', 'js:minify'));
