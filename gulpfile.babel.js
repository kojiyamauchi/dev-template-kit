'use strict'

// Import Gulp API.
import { src, dest, lastRun, series, parallel, watch } from 'gulp'

/*
 Plugin Modules.
*/
// Utilities.
import utility from 'gulp-util'
import plumber from 'gulp-plumber'
import notify from 'gulp-notify'
import rename from 'gulp-rename'
import del from 'del'
import replace from 'gulp-replace'
import crypto from 'crypto'
import gulpIf from 'gulp-if'
// For Webpack & JS.
import webpack from 'webpack'
import webpackStream from 'webpack-stream'
import webpackGulp from './webpack/webpack.gulp.babel'
import terser from 'gulp-terser'
// For Sass & CSS.
import sass from 'gulp-sass'
import sassGlob from 'gulp-sass-glob'
import postCSS from 'gulp-postcss'
import autoprefixer from 'autoprefixer'
import fixFlexBugs from 'postcss-flexbugs-fixes'
import cachebuster from 'postcss-cachebuster'
import csscomb from 'gulp-csscomb'
import cssmin from 'gulp-cssmin'
// For Template.
import ejs from 'gulp-ejs'
import templateMinify from 'gulp-htmlmin'
import templatePrettify from 'gulp-prettify'
// For Images.
import imgMin from 'gulp-imagemin'
import pngMin from 'imagemin-pngquant'
import svgMin from 'gulp-svgmin'
// For Env.
import browserSync from 'browser-sync'
import ftp from 'vinyl-ftp'
import sftp from 'gulp-sftp'

// Settings.
const postCSSPlugIn = [autoprefixer({ grid: true }), fixFlexBugs, cachebuster()]
const inImages = 'addImages/*'
const outImages = 'images/'
const buildFiles = [
  '**/*.html',
  'css/**.min.css',
  'js/**.min.js',
  'images/**/*',
  '!node_modules/**/*.html'
]
const templatesMonitor = [
  'js/**.min.js',
  'css/**.min.css',
  'ejs/**/*',
  'images/**/*'
]
const cacheBusting = [
  '**/*.html',
  '!node_modules/**/*.html'
]

// Compile JS by webpack.
export const onWebpack = () => {
  return webpackStream(webpackGulp, webpack)
  .on('error', function () {
    this.emit('end')
  })
  .pipe(dest('js/'))
}

// Minify JS.
export const onJsmin = () => {
  return src(['js/*.js', '!js/*.min.js'])
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

// Minify CSS.
export const onCssmin = () => {
  return src(['css/*.css', '!css/*.min.css'])
  .pipe(cssmin())
  .pipe(rename({ suffix: '.min' }))
  .pipe(dest('css/'))
}

// Compile EJS.
export const onEjs = () => {
  return src(['ejs/**/*.ejs', '!ejs/**/_*.ejs'])
    .pipe(plumber({ errorHandler: notify.onError('error: <%= error.message %>') }))
    .pipe(ejs())
    .pipe(rename({ extname: '.html' }))
    .pipe(dest('.'))
}

// Add Cache Busting to File Path & Minify or Prettify for Template.
export const onCacheBusting = () => {
  return src(cacheBusting)
    .pipe(
      replace(/\.(js|css|jpg|jpeg|png|svg|gif)\?rev/g, match => {
        const revision = () => crypto.randomBytes(8).toString('hex')
        return `${match}=${revision()}`
      })
    )
    .pipe(
      gulpIf(
        switches.templatemin,
          templateMinify({
            minifyJS: true,
            minifyCSS: true,
            collapseWhitespace : true,
            removeComments : true
          }),
          templatePrettify({
            indent_size: 2,
            indent_char: ' ',
            end_with_newline: false,
            preserve_newlines: false,
            unformatted: ['span', 'a', 'img']
          })
        )
      )
    .pipe(dest('.'))
}

// Delete Query String for Cache Busting.
export const onDeleteCacheBusting = () => {
  return src('ejs/**/*.ejs')
  .pipe(replace('?rev', ''))
  .pipe(dest('ejs/'))
}

// Delete Unnecessary Files.
export const onDelete = cb => {
  return del(
    [
      '**/.DS_Store',
      'js/*.js',
      'css/*.css',
      '**/*.ejs',
      '!js/*.min.js',
      '!css/*.min.css',
      '!ejs/**/*',
    ], cb)
}

// Compression Images.
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

// Launch Local Browser.
export const onBrowserSync = () => {
  return browserSync({
    browser: 'google chrome canary',
    open: 'external',
    notify: false,
    /* if Setting Proxy.
    proxy: 'test.dev or localhost:8080'
    */
    // Setting Root.
    server: { baseDir: '.', index: 'index.html' }
  })
}

// When Deploying by FTP.
export const onDeploy = () => {
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

// Build.
// Logic / Style / Template / All.
export const onEcma = series(onWebpack, onJsmin, onDelete)
export const onStyles = series(onSass, onCssmin, onDelete)
export const onTemplates = series(onEjs, onCacheBusting, onDelete)
export const onBuild = parallel(onEcma, onStyles, onTemplates)

// Development.
exports.default = parallel(onBrowserSync, () => {
  if (switches.ecma) watch('base/**/*', onEcma)
  if (switches.styles) watch('sass/**/*.scss', onStyles)
  if (switches.templates) watch(templatesMonitor, onTemplates)
  if (switches.imgmin) watch(inImages, parallel(onImgmin, onSvgmin))
  if (switches.rename) watch('**/*', onRename)
  let timeID
  watch(cacheBusting).on('change',() => {
    clearTimeout(timeID)
    timeID = setTimeout(() => {
      if (switches.deploy) onDeploy()
      browserSync.reload()
    }, 2000)
  })
})

// Switches.
const switches = {
  ecma: true,
  styles: true,
  templates: true,
  imgmin: false,
  rename: false,
  deploy: false,
  templatemin: true
}
