var gulp = require("gulp");
var cssnano = require("gulp-cssnano");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
// var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var concat = require("gulp-concat");
var cache = require("gulp-cache");
var imagemin = require("gulp-imagemin");
var watch = require("gulp-watch");
var batch = require('gulp-batch');
var browserSync = require("browser-sync").create();
var gutil = require('gulp-util');
var reload = browserSync.reload;

var path = {
    'html': './src/',
    'css': './src/css/',
    'js': './src/js/',
    'images': './src/images/',
    'html_dist': './src/dist/',
    'css_dist': './src/dist/css/',
    'js_dist': './src/dist/js/',
    'images_dist': './src/dist/images/',
};


// 处理 js general 文件
// gulp.task("js_general", function () {
//     return gulp.src(path.js_general + '*.js')
//         .pipe(concat(path.jsTutorial))
//         .pipe(gulp.dest('./'))
//         .pipe(browserSync.stream())
// });

// 处理 html 文件的任务
gulp.task("html", function () {
    gulp.src(path.html + '*.html')
        .pipe(gulp.dest(path.html_dist))
        .pipe(browserSync.stream())
});


// 定义一个css的任务
gulp.task("css", function () {
    gulp.src(path.css + '*.css')
        .pipe(cssnano())  // 压缩文件
        .pipe(rename({"suffix": ".min"}))  // 重命名文件
        .pipe(gulp.dest(path.css_dist))  // 将处理好的文件放进 css_dist 目录下
});

// // 定义处理js文件的任务
gulp.task("js", function () {
    gulp.src(path.js + '*.js')
        .pipe(uglify())  // 丑化文件
        .on('error', function (err) {
            gutil.log(gutil.colors.red('[Error]'), err.toString());
        })
        .pipe(gulp.dest(path.js_dist))  // 将文件放进js_dist目录下
});

// 定义处理图片文件的任务
gulp.task("images", function () {
    gulp.src(path.images + '*.*')
        .pipe(cache(imagemin()))
        .pipe(gulp.dest(path.images_dist))
});


// 定义监听文件修改的任务
gulp.task("watch", function () {
    gulp.watch(path.css + '*.css', ['css']);
    gulp.watch(path.js + '*.js', ['js']);
    gulp.watch(path.images + '*.*', ['images']);
    gulp.watch(path.html + '*.html', ['html']);
});


// 初始化browser-sync的任务
gulp.task("browserSync", ['css', 'js', 'images', 'html'],function () {
    browserSync.init({
        'notify': true,
        'open':true,
        'files': ['dist/**/*', 'src/**/*'],
        'server': {
            'baseDir': './',
            'index': 'src/selector.html'
        }
    });
    // gulp.watch(['dist/**/*']).on('change', reload)
    
});

// 创建一个默认的任务
gulp.task("default", ['browserSync', 'watch'], function () {
    console.log("default...")
});