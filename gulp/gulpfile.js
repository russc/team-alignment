//------------------------------------//
//    Plugins
//------------------------------------//
// Wiki: http://wiki.esitelabs.com:1081/index.php/Gulp_Workflow
var gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  browserSync = require('browser-sync').create(),
  gulpif = require('gulp-if'),
  imagemin = require('gulp-imagemin'),
  minimist = require('minimist'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps');


//------------------------------------//
//    Variables
//------------------------------------//
// Localhost URL for BrowserSync
// Use the --proxy flag to change without editing this file
var localhost = '';

// Paths
var paths = {
  theme: './application/themes/shs/',
  sass: './application/themes/shs/css/scss/',
  css: './application/themes/shs/css/',
  img: './application/themes/shs/img/',
  js: './application/themes/shs/js/'
};

// Autoprefixer browser support
// https://github.com/ai/browserslist#queries
var support = ['last 2 versions', 'ie >= 9', 'iOS >= 8'];

// Flags
var knownFlags = {
  boolean: ['dev', 'bs'],
  string: ['proxy'],
  default: {
    dev: true,
    bs: true,
    proxy: localhost
  }
};
var flags = minimist(process.argv.slice(2), knownFlags);


//------------------------------------//
//    Tasks
//------------------------------------//

// Sass
function sassTask() {
  gulp.src(paths.sass + 'layout.scss')
    .pipe(gulpif(flags.dev, sourcemaps.init()))
    .pipe(sass({
      outputStyle: (flags.dev) ? 'expanded' : 'compressed'
    })
      .on('error', sass.logError))
    .pipe(autoprefixer({ browsers: support }))
    .pipe(gulpif(flags.dev, sourcemaps.write('./')))
    .pipe(gulp.dest(paths.css))
    .pipe(gulpif(flags.bs, browserSync.stream()));
}
sassTask.description = 'Compile sass, run autoprefixer, and save to ' + paths.css;
sassTask.flags = {
  'default': 'Output style is compressed.',
  '--dev': 'Output style is expanded and uses sourcemaps.'
};
gulp.task('sass', sassTask);


// Images
function imageTask() {
  gulp.src(paths.img + '*/*.{jpg,gif,png,svg}')
    .pipe(imagemin({ verbose: true }))
    .pipe(gulp.dest(paths.img));
}
imageTask.description = 'Optimizes images in ' + paths.img;
gulp.task('images', imageTask);


// Watch
function watchTask() {
  gulp.watch(paths.theme + '**/*.scss', ['sass'])
    .on('change', function (event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running sass task...');
    });
}
watchTask.description = 'Watches files for changes';
gulp.task('watch', watchTask);


// Default
gulp.task('default', ['sass', 'images', 'watch'], function () {
  if (flags.bs) {
    browserSync.init({
      proxy: flags.proxy,
      online: true
    });
  }
});