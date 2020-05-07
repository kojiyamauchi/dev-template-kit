'use strict'

// Switches Each Mode.
const switches = {
  production: false,
  siteMap: false,
  ecma: true,
  styles: true,
  templates: true,
  templatemin: true,
  compressionImages: true,
  delete: true,
  copy: false,
  rename: false
}

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
import webpackDev from './webpack/webpack.gulp.dev.babel'
import webpackPro from './webpack/webpack.gulp.pro.babel'
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
import imagemin from 'gulp-imagemin'
import mozjpeg from 'imagemin-mozjpeg'
import pngquant from 'imagemin-pngquant'
// For Env.
import browserSync from 'browser-sync'

// Settings.
const postCSSPlugIn = [autoprefixer({ grid: true }), fixFlexBugs, cachebuster()]
const templatesMonitor = ['./resource/ejs/**/*']
const templateEntryPointIgnore = []
const cacheBusting = ['./delivery/**/*.html']
const styleEntryPointIgnore = []
const styleGlobIgnore = []
const inCompressionImages = './resource/images/*'
const outCompressionImages = './delivery/assets/images/'
const reloadMonitor = ['./delivery/**/*', './resource/ejs/**/_*.ejs', './resource/sass/**/*.scss']

// Development Mode of ECMA by Webpack.
export const onWebpackDev = () => {
  return webpackStream(webpackDev, webpack)
    .on('error', function () {
      this.emit('end')
    })
    .pipe(dest('./delivery/assets/js/'))
}

// Production Mode of ECMA by Webpack.
export const onWebpackPro = () => {
  return webpackStream(webpackPro, webpack)
    .on('error', function () {
      this.emit('end')
    })
    .pipe(dest('./delivery/assets/js/'))
}

// Compile sass.
export const onSass = () => {
  return src(['./resource/sass/**/*.scss', ...styleEntryPointIgnore], { sourcemaps: true })
    .pipe(plumber({ errorHandler: notify.onError('error: <%= error.message %>') }))
    .pipe(sassGlob({ ignorePaths: styleGlobIgnore }))
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(postCSS(postCSSPlugIn))
    .pipe(csscomb())
    .pipe(dest('./resource/css/', { sourcemaps: '../maps' }))
}

// Minify CSS.
export const onCssmin = () => {
  return src('./resource/css/**/*.css')
    .pipe(cssmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('./delivery/assets/css/'))
}

// Compile EJS.
export const onEjs = () => {
  return src(['./resource/ejs/**/*.ejs', '!./resource/ejs/**/_*.ejs', ...templateEntryPointIgnore])
    .pipe(plumber({ errorHandler: notify.onError('error: <%= error.message %>') }))
    .pipe(ejs())
    .pipe(rename({ extname: '.html' }))
    .pipe(dest('./delivery/'))
}

// Add Cache Busting to File Path & Minify or Prettify for Template.
export const onCacheBusting = () => {
  return src(cacheBusting)
    .pipe(
      replace(/\.(js|css|jpg|jpeg|png|svg|gif)\?rev/g, (match) => {
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
          collapseWhitespace: true,
          removeComments: true
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
    .pipe(dest('./delivery/'))
}

// Delete Query String for Cache Busting.
export const onDeleteCacheBusting = () => {
  return src('./resource/ejs/**/*.ejs').pipe(replace('?rev', '')).pipe(dest('./resource/ejs/'))
}

const onCompressionImages = () => {
  return src(inCompressionImages)
    .pipe(plumber())
    .pipe(
      imagemin([
        pngquant({ quality: [0.65, 0.8], speed: 1 }),
        mozjpeg({ quality: 80 }),
        imagemin.gifsicle({ interlaced: false }),
        imagemin.svgo({ plugins: [{ removeViewBox: true }, { cleanupIDs: false }] })
      ])
    )
    .pipe(dest(outCompressionImages))
}

// Delete Unnecessary Files.
export const onDelete = (cb) => {
  return del(['**/.DS_Store', './delivery/**/*.ejs', '!node_modules/**/*'], cb)
}

// For When Building Manually, Delete Compiled Files Before Building. ( When Switching Working Branches. )
export const onClean = (cd) => {
  return del([
    './delivery/assets/js/**/**.min.js',
    './delivery/assets/css/**',
    './delivery/**/*.html',
    './delivery/assets/images/*',
    './resource/css/**',
    './resource/map/**'
  ])
}

// When Renaming Files.
export const onRename = () => {
  return src('addFile.name')
    .pipe(rename({ extname: '.extension' }))
    .pipe(dest('.'))
}

// When File Copy / Move.
export const onCopy = () => {
  return src('Add Source Dir/').pipe('Add Destination Dir/')
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
    server: { baseDir: './delivery/', index: 'index.html' },
    startPath: switches.siteMap ? 'site-map.html' : null
  })
}

// Build　Manually.
// Logic / Style / Template / All.
export const onEcma = switches.production ? onWebpackPro : onWebpackDev
export const onStyles = series(onSass, onCssmin)
export const onTemplates = series(onEjs, onCacheBusting)
export const onBuild = series(onClean, parallel(onWebpackPro, onStyles, onTemplates, onCompressionImages))

// When Developing, Build Automatically.
exports.default = parallel(onBrowserSync, () => {
  if (switches.ecma) watch(['./resource/base/**/*', './resource/types/**/*'], onEcma)
  if (switches.styles) watch('./resource/sass/**/*.scss', onStyles)
  if (switches.templates) watch(templatesMonitor, onTemplates)
  if (switches.compressionImages) watch(inCompressionImages, onCompressionImages)
  if (switches.delete) watch(['./resource/**/*.ejs', '!./resource/ejs/**/*'], onDelete)
  if (switches.rename) watch('**/*', onRename)
  let timeID
  watch(reloadMonitor).on('change', () => {
    clearTimeout(timeID)
    timeID = setTimeout(() => {
      if (switches.copy) onCopy()
      browserSync.reload()
    }, 2000)
  })
})
