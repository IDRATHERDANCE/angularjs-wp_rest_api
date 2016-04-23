var gulp = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect'),
    guplif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    uglifycss = require('gulp-uglifycss');
    minifyHTML = require('gulp-minify-html'),
    jasmine = require('gulp-jasmine'),
    cors = function (req, res, next) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', '*');
      next();
    };



var env,
    jsSourcesRegular,
    jsSourcesPhone,
    jsSourcesIE10,
    sassSources,
    sassSources,
    outputDir,
    env = process.env.NODE_ENV || 'development';


if (env==='development'){
    outputDir = 'builds/development/';
} else {
    outputDir = 'builds/production/';
}


jsSourcesRegular = ['components/angular/*.js', 'components/angular/regular/*.js', 'components/scripts/*.js', 'components/scripts/regular/*.js'];
jsSourcesPhone = ['components/angular/*.js', 'components/angular/phone/*.js', 'components/scripts/*.js', 'components/scripts/phone/*.js'];
jsSourcesIE10 = ['components/angular/*.js', 'components/angular/ie10/*.js', 'components/scripts/*.js', 'components/scripts/regular/*.js'];
sassSources = ['components/sass/styles.scss', 'components/sass/styles_phone.scss'];

    gulp.task('sass', function(){
        gulp.src(sassSources)
            .pipe(compass({
                sass: 'components/sass',
                image: 'builds/production/images',
                require: 'breakpoint'
            }))
            .pipe(guplif(env==='production', uglifycss()))
            .on('error', gutil.log)
            .pipe(gulp.dest(outputDir + 'css'))
            .pipe(connect.reload())
        
    });


    gulp.task('js', function(){
        gulp.src(jsSourcesRegular)
            .pipe(concat('script.js'))
            .pipe(browserify())
            .pipe(guplif(env==='production', uglify()))
            .pipe(gulp.dest(outputDir + 'js'))
            .pipe(connect.reload())
            
    });

    gulp.task('jsPhone', function(){
        gulp.src(jsSourcesPhone)
            .pipe(concat('scriptPhone.js'))
            .pipe(browserify())
            .pipe(guplif(env==='production', uglify()))
            .pipe(gulp.dest(outputDir + 'js'))
            .pipe(connect.reload())
    });

    gulp.task('jsIE10', function(){
        gulp.src(jsSourcesIE10)
            .pipe(concat('scriptIE10.js'))
            .pipe(browserify())
            .pipe(guplif(env==='production', uglify()))
            .pipe(gulp.dest(outputDir + 'js'))
            .pipe(connect.reload())
    });

    gulp.task('html', function(){
         gulp.src('builds/development/*.html')
         .pipe(guplif(env==='production', minifyHTML()))
         .pipe(guplif(env==='production', gulp.dest(outputDir)))
         .pipe(connect.reload())
    });
    
    gulp.task('htmlPage', function(){
         gulp.src('builds/development/part/*.html')
         .pipe(guplif(env==='production', minifyHTML()))
         .pipe(guplif(env==='production', gulp.dest(outputDir + 'part/')))
         .pipe(connect.reload())
    });

    gulp.task('watch', function(){
        gulp.watch('components/sass/*.scss', ['sass']);
        gulp.watch(jsSourcesRegular, ['js']);
        gulp.watch(jsSourcesPhone, ['jsPhone']);
        gulp.watch(jsSourcesIE10, ['jsIE10']);
        gulp.watch('builds/development/*.html', ['html']);
        gulp.watch('builds/development/part/*.html', ['htmlPage']);
        gulp.watch('tests/spec/specs.js', ['jasmineTest']);
        
    });

    gulp.task('connect', function(){
        connect.server({
            root: outputDir,
            livereload: true,
            middleware: function () {
              return [cors];
            }
        })
    });

    gulp.task('default', ['html', 'htmlPage', 'sass', 'js', 'jsPhone', 'jsIE10', 'connect', 'watch']);

// run Jasmine tests

     gulp.task('connectTest', function(){
        connect.server({
            root: 'tests',
            livereload: true,
            middleware: function () {
              return [cors];
            }
        })
    });

//    gulp.task('jasmineTest', function(){
//         gulp.src('tests/SpecRunner.html')
//         .pipe(jasmine())
//         .pipe(connect.reload())
//         
//    });
//
//gulp.task('test', ['jasmineTest', 'connectTest', 'watch']);



