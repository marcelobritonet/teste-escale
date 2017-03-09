// Include gulp
var gulp = require('gulp'),

// Include plugins
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    gulpif = require('gulp-if'),
    useref = require('gulp-useref'),
    cleanCss = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    spa = require('browser-sync-spa'),
    connect = require('gulp-connect'),
    imagemin = require('gulp-imagemin');

var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded',
    noCache: true
};

//convert scss to css
gulp.task('styles', function () {
    gulp
        .src('./src/styles/**/*.sass')
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('./maps/'))
        .pipe(gulp.dest('./src/assets/css/'))
        .pipe(browserSync.stream());
});

// Images
gulp.task('images', function () {
    return gulp.src('./src/assets/imgs/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('_dist/imgs/'));
});

// Fonts
gulp.task('fonts', function () {
    return gulp.src('./src/assets/fonts/*')
        .pipe(gulp.dest('_dist/fonts/'));
});

//modal
gulp.task('modal', function () {
    return gulp.src('./src/interno/*')
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulp.dest('_dist/interno/'));
});

//build
gulp.task('build', ['fonts', 'styles', 'images', 'modal'], function () {
    return gulp.src([
        './src/**/*.html',
        '!./src/tests/**',
        '!./src/interno/',
        '!./node_modules/**',
        '!./bower_components/**',
        '!./_dist/**',
        './src/Web.config'
    ])
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', cleanCss()))
        .pipe(gulp.dest('_dist'));
});

//serve build dir
gulp.task('serve-build', function () {
    connect.server({
        name: 'Serve Build Dir',
        root: '_dist',
        port: 8000,
        livereload: true
    });
});

// Static Server + watching sass/html files
gulp.task('serve', ['styles'], function () {
    browserSync.use(
        spa({
            selector: '[application]',
            history: {
                index: '/index.html'
            }
        })
    );

    browserSync.init({
        server: {
            baseDir: './src',
            routes: {
                '/bower_components': 'bower_components',
                '/node_modules': 'node_modules'
            }
        }
    });

    gulp.watch('./src/**/*.sass', ['styles']);
    gulp.watch('./src/**/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['serve']);