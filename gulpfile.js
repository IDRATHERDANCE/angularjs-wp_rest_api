var gulp = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass')
    

var jsSourcesRegular = ['components/angular/*.js', 'components/angular/regular/*.js', 'components/scripts/*.js', 'components/scripts/regular/*.js'];
var jsSourcesPhone = ['components/angular/*.js', 'components/angular/phone/*.js', 'components/scripts/*.js', 'components/scripts/phone/*.js'];
var jsSourcesIE10 = ['components/angular/*.js', 'components/angular/ie10/*.js', 'components/scripts/*.js', 'components/scripts/regular/*.js'];
var sassSources = ['components/sass/styles.scss', 'components/sass/styles_phone.scss'];

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
        gulp.src(jsSourcesRegular)
            .pipe(concat('script.js'))
            .pipe(browserify())
            .pipe(gulp.dest('builds/development/js'))
    });

    gulp.task('jsPhone', function(){
        gulp.src(jsSourcesPhone)
            .pipe(concat('scriptPhone.js'))
            .pipe(browserify())
            .pipe(gulp.dest('builds/development/js'))
    });

    gulp.task('jsIE10', function(){
        gulp.src(jsSourcesIE10)
            .pipe(concat('scriptIE10.js'))
            .pipe(browserify())
            .pipe(gulp.dest('builds/development/js'))
    });


    gulp.task('watch', function(){
        gulp.watch('components/sass/*.scss', ['sass']);
        gulp.watch(jsSources, ['js']);
        
    });


    gulp.task('default', ['sass', 'js', 'jsPhone', 'jsIE10']);