'use strict'
import gulp from 'gulp' // import gulp.
// Utility Package.
import gutil from 'gulp-util' // gulp-util plugin.
import changed from 'gulp-changed' // only change file watch plugin.
import plumber from 'gulp-plumber' // if error task. don't stop watch plugin.
import rename from 'gulp-rename' // File Rename PlugIn.
import del from 'del' // File Delete PlugIn.
// For Webpack.
import webpack from 'webpack' // webpack.
import webpackStream from 'webpack-stream' // webpack PlugIn.
import webpackConfig from './webpack/webpack.config' // webpack config file.
// For JS.
import concat from 'gulp-concat' // JS File Concatenate.
import jsmin from 'gulp-uglify' // JS File Compression.
import ejs from 'gulp-ejs' // gulp ejs.
// For Sass & CSS.
import sass from 'gulp-sass' // sass file compile.
import sassGlob from 'gulp-sass-glob' // sass glob.
import postCss from 'gulp-postcss' // postcss.
import autoprefixer from 'autoprefixer' // add vendor prefix in CSS automatically.
import flexbug from 'postcss-flexbugs-fixes' // for flexbox bug.
import cssComb from 'gulp-csscomb' // code formatting for CSS.
import cssmin from 'gulp-cssmin' // CSS File Compression.
import sourcemaps from 'gulp-sourcemaps' // write sourcemaps.
// For HTML.
import prettify from 'gulp-prettify' // code formatting for HTML.
// For Images.
import imageMin from 'gulp-imagemin' // images compression.
import pngImageMin from 'imagemin-pngquant' // png images compression.
import svgMin from 'gulp-svgmin' // svg compression.
// For FTP.
import ftp from 'vinyl-ftp' // ftp plugin.
import sftp from 'gulp-sftp' // sftp plugin.
// For BrowserSync.
import using_PHP_LocalServerConnect from 'gulp-connect-php' // using php local server connect.
import browserSync from 'browser-sync' // browserSync.
// Setting.
const autoprefixerSet = ['last 2 version', 'ie >= 10', 'iOS >= 8', 'Android >= 4.4'] // setting of autoprefixer.
const postCssPlugIn = [autoprefixer({ browsers: autoprefixerSet }), flexbug] // PostCSS plugin.
const addImgDir = ('addImages/*') // added image fold,
const dstImgDir = ('images/*') // compression image fold,
const upLoadFileWrite = (['*.html', 'css/app.min.css', 'js/core.min.js', 'images/*']) // upload file.
const notUpLoadFileWrite = ([]) // don't upload file.
const upLoadFile = upLoadFileWrite.concat(notUpLoadFileWrite) // ftp upload files.

// webpack.
gulp.task('webpack', () => {
  return webpackStream(webpackConfig, webpack)
    .pipe(gulp.dest('js/'))
})

// JS File Concatenate.
gulp.task('concat', () => {
  return gulp.src(['plugins/*.js', 'js/_core.js'])
    .pipe(concat('core.js'))
    .pipe(gulp.dest('js/'))
})

// JS File Compression.
gulp.task('jsmin', () => {
  return gulp.src('js/core.js')
    .pipe(jsmin({
      output: {
        comments: /^!/
      }
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('js/'))
})

// sass compile & use PostCSS plugIn.
gulp.task('sass', () => {
  return gulp.src('sass/*.scss')
    .pipe(plumber({
      errorHander: (error) => {
        console.log(error.message)
      }
    }))
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(postCss(postCssPlugIn))
    .pipe(sourcemaps.write('../maps'))
    .pipe(cssComb())
    .pipe(gulp.dest('css/'))
})

// CSS File Compression.
gulp.task('cssmin', () => {
  return gulp.src('css/*.css')
    .pipe(cssmin())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('css/'))
})

// ejs funcitions.
gulp.task('ejs', function () {
  return gulp.src(['ejs/*', '!ejs/*.ejs'])
    .pipe(ejs())
    .pipe(gulp.dest('/'))
})

// Code Formatting for HTML.
gulp.task('prettify', () => {
  return gulp.src('**/*.html')
    .pipe(prettify({
      'indent_size': 2,
      'indent_char': ' ',
      'end_with_newline': false,
      'preserve_newlines': false,
      'unformatted': ['span', 'a', 'img']
    }))
    .pipe(gulp.dest('.'))
})

// compression images.
gulp.task('imgMin', () => {
  return gulp.src(addImgDir + '(.jpg|.jpeg|.png|.gif)')
    .pipe(plumber())
    .pipe(changed(addImgDir))
    .pipe(imageMin({
      use: [pngImageMin({
        quality: '60-80',
        speed: 4
      })]
    }))
    .pipe(gulp.dest(dstImgDir))
})

// svg file compression.
gulp.task('svgMin', () => {
  return gulp.src(addImgDir + '.svg')
    .pipe(plumber())
    .pipe(changed(addImgDir))
    .pipe(svgMin())
    .pipe(gulp.dest(dstImgDir))
})

// HTML File Rename PHP File. Setting at The Work Start.
gulp.task('rename', () => {
  return gulp.src('index.html')
    .pipe(rename({
      extname: '.php'
    }))
    .pipe(gulp.dest('.'))
})

// HTML File & .DS_Store Delete. Setting at The Work Start.
gulp.task('delete', (cb) => {
  return del(['**/.DS_Store'], cb)
})

// local browser connect & sync.
gulp.task('browserSync', () => {
  return using_PHP_LocalServerConnect.server({
    port: 8080,
    bin: '/Applications/MAMP/bin/php/php5.6.10/bin/php', // PHP pass.
    ini: '/Applications/MAMP/bin/php/php5.6.10/conf/php.ini' // PHP.ini pass.
  }, () => {
    return browserSync({
      proxy: 'localhost:8080',
      notify: false,
      browser: 'google chrome'
    })
  })
})

// file save's local browser reload.
gulp.task('localBrowserReload', () => {
  return browserSync.reload()
})

// ftp upload.
gulp.task('ftpUpLoad', () => {
  const ftpConnect = ftp.create({
    host: '***',
    user: '***',
    password: '***',
    parallel: 7,
    log: gutil.log
  })
  return gulp.src(upLoadFile, {
      base: '.',
      buffer: false
    })
    .pipe(ftpConnect.newer('/'))
    .pipe(ftpConnect.dest('/'))
})

// gulp default task, terminal command 'gulp'.
gulp.task('default', ['browserSync'], () => { // first task, local server connect & local browser sync.
  gulp.watch(['base/*', 'tags/*', 'three/*'], ['webpack']) // JS File webpack.
  gulp.watch(['js/_core.js'], ['concat']) // JS File Concatenate.
  gulp.watch('js/core.js', ['jsmin']) // watching change's JS flie, File Compression.
  gulp.watch('sass/app.scss', ['sass']) // watching sass file save's auto compile & add vendor prefix automatically.
  gulp.watch('css/app.css', ['cssmin']) // watching change's CSS flie, File Compression.
  gulp.watch('ejs/*', ['ejs']) // watch ejs.
  gulp.watch('**/*.html', ['prettify']) // watch prettify.
  gulp.watch(addImgDir, ['imgMin', 'svgMin']) // watching Img Dir compression.
  gulp.watch('**/*', ['rename']) // watching change's HTML flie. Rename PHP file.
  gulp.watch('**/*', ['delete']) // watching rename PHP file. delet HTML file.
  gulp.watch(upLoadFile, ['ftpUpLoad']) // watching file save's auto ftp upload.
  gulp.watch(upLoadFile, ['localBrowserReload']) // watching file save's local browser reload.
})
