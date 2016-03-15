var gulp = require('gulp');
var watch = require('gulp-watch');

var sass = require('gulp-sass');


var paths = {
    'src':['./models/**/*.js','./routes/**/*.js', 'keystone.js', 'package.json']

,
    'style': {
        all: ['./public/scss/*.scss', './public/scss/site/*.scss', './public/scss/site/*.scss', './public/scss/site/**/*.scss'],
        output: './public/styles/'
    }

};

gulp.task('watch:sass', function () {
    gulp.watch(paths.style.all, ['sass']);
});

gulp.task('sass', function(){
    return gulp.src(paths.style.all)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.style.output));
});


gulp.task('watch', [
  'watch:sass',
]);

gulp.task('default', ['watch']);
