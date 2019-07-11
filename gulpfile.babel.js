'use strict'

// Import Gulp API.
import { src, dest, lastRun, parallel, watch } from 'gulp'

/*
 Plugin Modules.
*/
// Utilities.
import utility from 'gulp-util'
import plumber from 'gulp-plumber'
import notify from 'gulp-notify'
import rename from 'gulp-rename'
import del from 'del'
// For Webpack.
import webpack from 'webpack'
import webpackStream from 'webpack-stream'
import webpackGulp from './webpack/webpack.gulp.babel'
// For JS.
import terser from 'gulp-terser'
import ejs from 'gulp-ejs'
// For Sass & CSS.
import sass from 'gulp-sass'
import sassGlob from 'gulp-sass-glob'
import postCSS from 'gulp-postcss'
import autoprefixer from 'autoprefixer'
import fixFlexBugs from 'postcss-flexbugs-fixes'
import csscomb from 'gulp-csscomb'
import cssmin from 'gulp-cssmin'
// For HTML.
import prettify from 'gulp-prettify'
// For Images.
import imgMin from 'gulp-imagemin'
import pngMin from 'imagemin-pngquant'
import svgMin from 'gulp-svgmin'
// For Env.
import browserSync from 'browser-sync'
import ftp from 'vinyl-ftp'
import sftp from 'gulp-sftp'

// Settings.
const autoprefixerBrowserList = [ 'last 2 version', 'ie >= 10', 'iOS >= 8', ]
const postCSSPlugIn = [autoprefixer({ browsers: autoprefixerBrowserList, grid: true }), fixFlexBugs]
const inImages = 'addImages/*'
const outImages = 'images/'
const buildFiles = [
  '**/*.html',
  'css/**.min.css',
  'js/**.min.js',
  'images/**/*',
  '!node_modules/**/*.html'
]

// Compile JS, Using webpack.
export const onWebpack = () => {
  return webpackStream(webpackGulp, webpack)
  .on('error', function () {
    this.emit('end')
    console.log('error')
  })
  .pipe(dest('js/'))
}

// Compression JS.
export const onJsmin = () => {
  return src('js/*.js', '!/js/*.min.js')
  .pipe(plumber({ errorHandler: notify.onError('error: <%= error.message %>') }))
  .pipe(terser())
  .pipe(rename({ suffix: '.min' }))
  .pipe(dest('js/'))
}

// Compile sass.
export const onSass = () => {
  return src('sass/**/*.scss', { sourcemaps: true })
  .pipe(plumber({ errorHandler: notify.onError('error: <%= error.message %>') }))
  .pipe(sassGlob())
  .pipe(sass({ outputStyle: 'expanded' }))
  .pipe(postCSS(postCSSPlugIn))
  .pipe(csscomb())
  .pipe(dest('css/', { sourcemaps: '../maps' }))
}

// Compression CSS.
export const onCssmin = () => {
  return src('css/*.css', '!css/*.min.css')
  .pipe(cssmin())
  .pipe(rename({ suffix: '.min' }))
  .pipe(dest('css/'))
}

// Compile EJS -> Code Formatting for HTML.
export const onEjs = done => {
  return src(['ejs/**/*.ejs', '!ejs/**/_*.ejs'])
  .pipe(ejs({}, {}, { ext: '.html' }))
  .pipe(dest('.'))
  .on('end', () => {
    src('**/*.html', '!node_modules/**/*.html')
    .pipe(
      prettify({
        indent_size: 2,
        indent_char: ' ',
        end_with_newline: false,
        preserve_newlines: false,
        unformatted: ['span', 'a', 'img']
      })
    )
    .pipe(dest('.'))
    .on('end', done)
  })
}

// Delete Unnecessary Files.
export const onDelete = cb => {
  return del(
    [
      '**/.DS_Store',
      'js/*.js',
      'css/*.css',
      '**/*.ejs',
      '!/js/*.min.js',
      '!css/*.min.css',
      '!ejs/**/*',
    ], cb)
}

// Compression Image Files.
export const onImgmin = () => {
  return src(`${inImages}(.jpg|.jpeg|.png|.gif)`, { since: lastRun(onImgmin) })
  .pipe(plumber())
  .pipe(imgMin({ use: [ pngMin({ quality: '60-80', speed: 4 }) ]}))
  .pipe(dest(outImages))
}

// Compression SVG Files.
export const onSvgmin = () => {
  return src(`${inImages}.svg`, { since: lastRun(onSvgmin) })
  .pipe(plumber())
  .pipe(svgMin())
  .pipe(dest(outImages))
}

// When Renaming Files.
export const onRename = () => {
  return src('addFile.name')
  .pipe(rename({ extname: '.extension' }))
  .pipe(dest('.'))
}

// When File Uploading on Server by FTP.
export const onFtpUpLoad = () => {
  const ftpConnect = ftp.create({
    host: '***',
    user: '***',
    password: '***',
    parallel: 7,
    log: utility.log
  })
  return src(buildFiles, { base: '.', buffer: false })
  .pipe(ftpConnect.newer('/'))
  .pipe(ftpConnect.dest('/'))
}

// Start Up Local Browser.
export const onBrowserSync = () => {
  return browserSync({
    browser: 'google chrome',
    open: 'external',
    notify: false,
    /* if Setting Proxy.
    proxy: 'test.dev or localhost:8080'
    */
    // Setting Root.
    server: { baseDir: '.', index: 'index.html' }
  })
}

// Default Tasks.
exports.default = parallel( onBrowserSync, () => {
  if(switches.webpack) watch('base/**/*', onWebpack)
  if(switches.jsmin) watch(['js/*.js', '!/js/*.min.js'], onJsmin)
  if(switches.sass) watch('sass/**/*.scss', onSass)
  if(switches.cssmin) watch(['css/*.css', '!css/*.min.css'], onCssmin)
  if(switches.ejs) watch('ejs/**/*', onEjs)
  if(switches.delete) watch(buildFiles, onDelete)
  if(switches.imgmin) watch(inImages, parallel(onImgmin, onSvgmin))
  if(switches.rename) watch('**/*', onRename)
  if(switches.ftp) watch(buildFiles, onFtpUpLoad)
  let timeID
  watch(buildFiles).on('change',() => {
    clearTimeout(timeID)
    timeID = setTimeout(() => browserSync.reload(), 1000)
  })
})

// Switches.
const switches = {
  webpack: true,
  jsmin: true,
  sass: true,
  cssmin: true,
  ejs: false,
  delete: true,
  imgmin: false,
  rename: false,
  ftp: false
}