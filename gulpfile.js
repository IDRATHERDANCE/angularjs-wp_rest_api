var gulp = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify')
    

var sassSources = ['sass/styles.scss'];
var jsSources = ['components/angular/*.js', 'components/scripts/*.js'];

//    gulp.task('sass', function(){
//        gulp.src(sassSources)
//        
//    });


    gulp.task('js', function(){
        gulp.src(jsSources)
            .pipe(concat('script.js'))
            .pipe(browserify())
            .pipe(gulp.dest('builds/development/js'))
        
    });