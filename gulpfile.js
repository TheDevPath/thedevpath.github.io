const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");

// Compile Sass & Inject Into Browser
gulp.task("sass", function() {
  return gulp
    .src(["node_modules/bootstrap/scss/bootstrap.scss", "docs/scss/*.scss"])
    .pipe(sass())
    .pipe(gulp.dest("docs/css"))
    .pipe(browserSync.stream());
});

// Move JS Files to docs/js
gulp.task("js", function() {
  return gulp
    .src([
      "node_modules/bootstrap/dist/js/bootstrap.min.js",
      "node_modules/jquery/dist/jquery.min.js",
      "node_modules/popper.js/dist/umd/popper.min.js"
    ])
    .pipe(gulp.dest("docs/js"))
    .pipe(browserSync.stream());
});

// Watch Sass & Serve
gulp.task("serve", ["sass"], function() {
  browserSync.init({
    server: "./docs"
  });

  gulp.watch(
    ["node_modules/bootstrap/scss/bootstrap.scss", "docs/scss/*.scss"],
    ["sass"]
  );
  gulp.watch("docs/*.html").on("change", browserSync.reload);
});

// Move Fonts to docs/fonts
gulp.task("fonts", function() {
  return gulp
    .src("node_modules/font-awesome/fonts/*")
    .pipe(gulp.dest("docs/fonts"));
});

// Move Font Awesome CSS to docs/css
gulp.task("fa", function() {
  return gulp
    .src("node_modules/font-awesome/css/font-awesome.min.css")
    .pipe(gulp.dest("docs/css"));
});

gulp.task("default", ["js", "serve", "fa", "fonts"]);
