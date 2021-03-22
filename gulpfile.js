const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create(); //reload browser
const postcss = require('gulp-postcss'); //gulp plugin to pipe CSS through several plugins
const sourcemaps = require('gulp-sourcemaps'); // if we use plugins we have to use it

const cssnano = require('gulp-cssnano'); // minify css files
const rename = require('gulp-rename');
const sassLint = require('gulp-sass-lint'); 
const uglifyJS = require('gulp-uglify');
const babel = require('gulp-babel');
const concat = require('gulp-concat'); // Concatenates files
const imagemin = require('gulp-imagemin');

  /* start task for scss */
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
  /* end task for scss */

  /* start task for css min */
  gulp.task('cssmin', function(){
    return gulp.src('./dist/css/master.css')
      .pipe(sourcemaps.init())
      .pipe(cssnano())
      .pipe(rename({ extname: '.min.css' }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('dist/css'))
  });
  /* end task for css min */

  /* start task for scripts */
  gulp.task('scripts', function(){
    gulp.src(['./src/scripts/vendor/sample-library.js', './src/scripts/vendor/sample-library2.js'])
      .pipe(babel({presets: ['@babel/preset-env'] })) 
      .pipe(uglifyJS())
      .pipe(concat('scripts.js'))
      .pipe(gulp.dest('./src/scripts'))
      .pipe(concat('bundle.js'))
      .pipe(rename({ extname: '.min.js' }))
      .pipe(gulp.dest('dist/scripts'))
  });
  /* ent task for scripts */

  /* start task for images */

  // !!! not working with gulp watch
  /* gulp.task('images', function(){
    return gulp.src('./src/images/*')
      .pipe(imagemin())
      .pipe(gulp.dest('dist/images'))
  }); */

  //working but only with the command 'gulp images'
  function img() {
    return gulp.src("./src/images/*")
    .pipe(imagemin())
    .pipe(gulp.dest("./dist/images"));
  }

  gulp.task('img', img);

  gulp.task('watch', () => {
    gulp.watch('./src/images/*', img);
  });

  gulp.task("images", gulp.series('img', 'watch'));

  /* end task for images */


  gulp.task('watch', function(){
    browserSync.init({
      server: {
      baseDir: './'
      },
  });

  gulp.watch('./src/sass/**/*.scss', gulp.series('sass')).on("change", browserSync.reload);
  gulp.watch('./dist/css/master.css', gulp.series('cssmin')).on("change", browserSync.reload);
  gulp.watch('./src/scripts/**/*.js', gulp.series('scripts')).on("change", browserSync.reload);
 // gulp.watch('./src/images/*', gulp.series('images')); 
});

 
 

