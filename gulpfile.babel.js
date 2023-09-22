import gulp from "gulp";
import babelify from "babelify";
import source from "vinyl-source-stream";
import browserify from "browserify";
import streamify from "gulp-streamify";
import uglify from "gulp-uglify";
const sass = require("gulp-sass")(require("sass"));

gulp.task("sass", () => {
  return gulp
    .src("./sass/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./css"));
});

gulp.task("js", () => {
  return browserify({
    entries: "./src/app.js",
    debug: true,
  })
    .transform(babelify)
    .bundle()
    .pipe(source("app.js"))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest("./dist"));
});

gulp.task("build", gulp.series("js", "sass"));

//gulp.task("default", gulp.series("js", "serve"));
