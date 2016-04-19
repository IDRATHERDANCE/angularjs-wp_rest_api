var gulp = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass')
    

var sassSources = ['sass/styles.scss'];
var jsSources = ['components/angular/*.js', 'components/scripts/*.js'];
var sassSources = ['components/sass/styles.scss'];

    gulp.task('sass', function(){
        gulp.src(sassSources)
            .pipe(compass({
                sass: 'components/sass',
                image: 'builds/development/images',
                style: 'expanded',
                require: 'breakpoint'
            }))

            .on('error', gutil.log)
            .pipe(gulp.dest('builds/development/css'))
        
    });


    gulp.task('js', function(){
        gulp.src(jsSources)
            .pipe(concat('script.js'))
            .pipe(browserify())
            .pipe(gulp.dest('builds/development/js'))
        
    });