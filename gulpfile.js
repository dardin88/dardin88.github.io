var gulp = require('gulp');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');


// Copy third party libraries from /node_modules into /vendor
// Currently no local vendor libraries are needed (Bootstrap via CDN, no jQuery)
gulp.task('vendor', function() {
  return Promise.resolve();
});

// (Removed) CSS build pipeline — SCSS compilation and CSS minification are no longer used.

// Minify JavaScript
gulp.task('js:minify', function() {
  return gulp.src([
      './js/*.js',
      '!./js/*.min.js'
    ])
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
  .pipe(gulp.dest('./js'));
});

// JS
gulp.task('js', gulp.series('js:minify'));

// Default task
gulp.task('default', gulp.series('js', 'vendor'));

// (Removed) BrowserSync and dev task — live reload and SCSS watching are no longer used.
