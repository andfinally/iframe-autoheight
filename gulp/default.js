var gulp = require("gulp");
var babel = require("gulp-babel");
var gzip = require("gulp-gzip");
var rename = require("gulp-rename");
var sass = require("gulp-sass");
var strip = require("gulp-strip-comments");
var supervisor = require("gulp-supervisor");
var uglify = require("gulp-uglify");

gulp.task("babel", function() {
	return gulp.src("./src/**/*.es")
		.pipe(strip())
		.pipe(babel())
		.pipe(rename({dirname: ""}))
		.pipe(gulp.dest("./dist"))
		.pipe(gulp.dest("./demo"))
		.pipe(uglify({compress: false}))
		.pipe(rename({dirname: "", extname: ".min.js"}))
		.pipe(gulp.dest("./dist"));
});

gulp.task("build-styles", function() {
	return gulp.src("./src/**/*.scss")
		.pipe(sass())
		.on("error", sass.logError)
		.pipe(rename({dirname: ""}))
		.pipe(gulp.dest("./demo"))
		.pipe(gulp.dest("./dist"));
});

gulp.task("watch", function() {
	gulp.watch("./src/**/*.scss", ["build-styles"]);
	gulp.watch("./src/**/*.es", ["babel"]);
});

gulp.task("dev-server", ["build-styles", "babel"], function() {
	console.log("STARTING DEVELOPMENT SERVER");
	supervisor("demo/server/index.js");
});

gulp.task("start", ["build-styles", "babel", "dev-server", "watch"]);

gulp.task("default", ["watch"]);
