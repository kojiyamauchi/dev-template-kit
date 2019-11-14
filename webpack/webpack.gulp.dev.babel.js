/*
   Setting webpack for Development.
*/

// Import webpack.
import webpack from 'webpack'

// Import webpack Merge.
import webpackMerge from 'webpack-merge'

// Import webpack Base.
import webpackBase from './webpack.gulp.base.babel'

// Core Setting Below,
// Base Setting by webpack.gulp.base.babel.js
export default webpackMerge(webpackBase, {
  // Setting webpack Mode.
  mode: 'development',
  cache: true,
  plugins: [],
  devtool: 'inline-source-map'
})
