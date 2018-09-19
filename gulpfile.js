"use strict";
const gulp = require("gulp");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es");

gulp.task("concat", () => {
  return gulp.src("public/**/*.js")
    .pipe(concat("main.js"))
    .pipe(gulp.dest("public/js"));
});



