const gulp        = require('gulp');
const jsmin       = require('gulp-jsmin');
const browserSync = require('browser-sync').create();

function jsMinify () {
  return gulp.src('./src/**/*.js')
    .pipe(jsmin())
    .pipe(gulp.dest('./dist'))
}

function buildHTML () {
  return gulp.src('./src/**/*.html')
    .pipe(gulp.dest('./dist'))
}

function watch (){
  browserSync.init({
    server: {
        baseDir: "./src/",
    },
    port: 8080
  });
  gulp.watch('./src/**/*.html').on('change', browserSync.reload);
  gulp.watch('./src/**/*.js').on('change', browserSync.reload);
};

const dev = gulp.series(watch);
const build = gulp.series(
  gulp.parallel(buildHTML, jsMinify)
);

exports.dev = dev;
exports.build = build;
