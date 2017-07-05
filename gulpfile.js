'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
gulp.task('sass', function() {
  return gulp.src('./src/styles/style.scss').pipe(sass().on('error', sass.logError)).pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  })).pipe(gulp.dest('./dest'))
})
gulp.task('sass:watch', function() {
  gulp.watch('./src/styles/**/*.scss', ['sass']);
});