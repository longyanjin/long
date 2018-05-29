var gulp = require("gulp"),
	minifyCss = require("gulp-clean-css"),
	uglify = require("gulp-uglify"),
	htmlMin = require("gulp-htmlmin"),
	sass = require("gulp-sass"),
	livereload = require("gulp-livereload");

// 创建gulp任务：压缩CSS
gulp.task("css", function(){
	gulp.src("css/*.css")
	    .pipe(minifyCss())
	    .pipe(gulp.dest("dist/css"));
});

// 创建gulp任务：压缩JS
gulp.task("js", function(){
	gulp.src("js/*.js")
		.pipe(uglify())
		.pipe(gulp.dest("dist/js"));
});

// 创建gulp任务：压缩html
gulp.task("html", function(){
	gulp.src("html/*.html")
		.pipe(htmlMin({collapseWhitespace: true, minifyCSS:true, minifyJS:true}))
		.pipe(gulp.dest("dist/html"));
});

// 创建gulp任务：编译 SASS
gulp.task("sass", function(){
	gulp.src("sass/*.scss")
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(gulp.dest("dist/css"))
		.pipe(livereload());
});

// 创建gulp监视任务：监视到scss文件的修改则执行sass任务
gulp.task("watch", function(){
	livereload.listen();
	gulp.watch("sass/*.scss", ["sass"]);
})

// 创建gulp默认任务
gulp.task("default", ["css", "js"]);