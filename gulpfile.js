// 获取 gulp
var gulp = require('gulp');

// 获取 gulp-imagemin 模块
var imagemin = require('gulp-imagemin')

// 压缩图片任务
// 在命令行输入 gulp images 启动此任务
gulp.task('images', function () {
    // 1. 找到图片
    // gulp.src('aaa/**/*.*')
    gulp.src('src/assets/images/**/*.*')
    // 2. 压缩图片
        .pipe(imagemin({
            progressive: true
        }))
        // 3. 另存图片
        // .pipe(gulp.dest('aaa'))
        .pipe(gulp.dest('src/assets/images'))
});

gulp.task('default', ['images'])