/*
   Setting webpack for Development.
*/

import webpack from 'webpack'
import webpackMerge from 'webpack-merge'
import webpackBase from './webpack.gulp.base.babel'

// Base Setting by webpack.gulp.base.babel.js
export default webpackMerge(webpackBase, {
  // Setting webpack Mode.
  mode: 'development',
  cache: true,
  plugins: [],
  devtool: 'inline-source-map'
})
