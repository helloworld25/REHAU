var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    htmlmin = require('gulp-htmlmin'),
    csso = require('gulp-csso'),
    uglify = require('gulp-uglify'),
    useref = require('gulp-useref'),
    gulpIf = require('gulp-if'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache');
    autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function(){
    return gulp.src('development/scss/*.scss')
        .pipe(sourcemaps.init({
            largeFile: true
        }))
        .pipe(sass({
            /*(for "sass" syntax instead of "scss")
            indentedSyntax: true,*/
            outputStyle: 'expanded',
            indentWidth: 4,
            precision: 10
        }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('development/css'))
});

gulp.task('watch', function(){
    return gulp.watch('development/scss/**/*.scss', ['sass']);
});

gulp.task('clearCache', function(done){
    return cache.clearAll(done);
});

gulp.task('clear', function(){
    return del.sync(['distribution/**', '!distribution']);
});

gulp.task('copyOver', ['clear'], function(){
    return gulp.src('development/{images/*.+(png|jpg|jpeg|gif|svg),fonts/*.+(woff|woff2|eot|svg|ttf|otf)}')
        .pipe(gulpIf('images/*', cache(imagemin())))
        .pipe(gulp.dest('distribution'));
});

gulp.task('deliver', ['copyOver'], function(){
    return gulp.src('development/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.html', htmlmin({
            collapseWhitespace: true,
            conservativeCollapse: true,
            minifyCSS: true,
            minifyJS: true,
            collapseBooleanAttributes: true,
            processConditionalComments: true,
            removeAttributeQuotes: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeOptionalTags: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            sortAttributes: true,
            sortClassName: true
        })))
        .pipe(gulpIf('*.css', csso()))
        .pipe(gulpIf('*.js', uglify({
            preserveComments: 'license'
        })))
        .pipe(gulp.dest('distribution'));
});