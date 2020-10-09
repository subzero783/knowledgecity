const gulp = require('gulp');
const gulpIf = require('gulp-if');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const htmlmin = require('gulp-htmlmin');
const cssmin = require('gulp-cssmin');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const jsImport = require('gulp-js-import');
const sourcemaps = require('gulp-sourcemaps');
const htmlPartial = require('gulp-html-partial');
const clean = require('gulp-clean');
const rename = require("gulp-rename");
const order = require("gulp-order");


// Copy fonts to fonts directory
function fonts() {
  return gulp.src([
    "./node_modules/@fortawesome/fontawesome-free/webfonts/*"
  ])
  .pipe(gulp.dest("./dist/webfonts/")); 
}

// Compile SCSS into minified CSS
function css() {
  return gulp.src([
    'src/scss/style.scss'
  ])
  .pipe(sourcemaps.init())
  .pipe(sass({
    includePaths: ['node_modules']
  }).on('error', sass.logError))
  .pipe(sourcemaps.write('.'))
  .pipe(cssmin())
  .pipe(gulp.dest('./dist/css/'));
}

// Compile JS files into minified file in the order listed below 
function js() {
  return gulp.src([
    "node_modules/jquery/dist/jquery.min.js",
    "node_modules/bootstrap/dist/js/bootstrap.min.js",
    "node_modules/@popperjs/core/dist/umd/popper.min.js",
    "node_modules/aos/dist/aos.js",
    "src/js/scripts.js"
  ])
  .pipe(order([
    "jquery.min.js",
    "bootstrap.min.js",
    "popper.min.js",
    "aos.js",
    "scripts.js"
  ]))
  .pipe(jsImport({
    hideConsole: true
  }))
  .pipe(concat('all.js'))
  .pipe(uglify())
  .pipe(gulp.dest('./dist/js/'));
}

function img() {
  return gulp.src('src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img/'));
}


function serve() {
  browserSync.init({
    open: true,
    proxy: 'http://localhost/knowledgecity'
  });
}

function browserSyncReload(done) {
  browserSync.reload();
  done();
}

function watchFiles() {
  gulp.watch('./*.html', gulp.series(browserSyncReload));
  gulp.watch('./*.php', gulp.series(browserSyncReload));
  gulp.watch('src/**/*.scss', gulp.series(css, browserSyncReload));
  gulp.watch('src/**/*.js', gulp.series(js, browserSyncReload));
  gulp.watch('src/img/**/*.*', gulp.series(img));
  return;
}

function del() {
  return gulp.src('css/*', {read: false})
    .pipe(clean());
}


exports.css = css;
exports.fonts = fonts;
exports.js = js;
exports.del = del;
exports.serve = gulp.parallel(css, js, img, watchFiles, serve);
exports.default = gulp.series(fonts, del, css, js, img);