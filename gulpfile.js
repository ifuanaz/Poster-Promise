const gulp = require('gulp'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    babel = require('gulp-babel');

gulp.task('sass', () => {
    gulp.src('sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(prefix({
        browsers: ['last 2 versions', '> 5%', 'ie 8']
    }))
    .pipe(gulp.dest('dist/css'))
});

gulp.task('es6', () => {
    return gulp.src('es6/**/*.js')
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(gulp.dest('dist/js'))
});

gulp.task('default', ['sass'], () => {
    gulp.watch('sass/**/*.scss', ['sass']);
    gulp.watch('es6/**/*.js', ['es6']);
});
