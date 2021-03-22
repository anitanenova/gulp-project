const gulp = require('gulp');

const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create(); //reload browser
const postcss = require('gulp-postcss'); //gulp plugin to pipe CSS through several plugins
const sourcemaps = require('gulp-sourcemaps'); // if we use plugins we have to use it

const cssnano = require('gulp-cssnano'); // minify css files
const rename = require('gulp-rename');
const sassLint = require('gulp-sass-lint'); 


  gulp.task('sass', function(){
    return gulp.src('./src/sass/master.scss')
      .pipe(sass()) // Converts Sass to CSS with gulp-sass     
          .pipe(sassLint())
          .pipe(sassLint.format())
          .pipe(sassLint.failOnError())
          .pipe(sourcemaps.init())
          .pipe(sass())
          .pipe(postcss(autoprefixer())
          .pipe(cssnano())
          .pipe(rename({ extname: '.min.css' }))
          .pipe(sourcemaps.write('./'))
          .pipe(gulp.dest('dist/css')))
  });

  gulp.task('cssmin', function(){
    return gulp.src('./dist/css/master.css')
      .pipe(sourcemaps.init())
      .pipe(cssnano())
      .pipe(rename({ extname: '.min.css' }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('dist/css'))
  });

  gulp.task('watch', function(){
    browserSync.init({
      server: {
      baseDir: './'
      },
  });

    gulp.watch('./src/sass/**/*.scss', gulp.series('sass')).on("change", browserSync.reload);
    gulp.watch('./dist/css/master.css', gulp.series('cssmin')).on("change", browserSync.reload);
   
  
  
});

 
 

