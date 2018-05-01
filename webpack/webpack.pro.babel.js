/*
   Setting webpack for Production.
*/

// Import webpack.
import webpack from 'webpack'

// Import webpack Merge.
import webpackMerge from 'webpack-merge'


// Import webpack Base.
import webpackBase from './webpack.base.babel'

// Using Base Setting for webpack.base.babel.js,
// If Using npm Script on '--mode production',
// Using of Below.
export default webpackMerge(webpackBase, {

  // Setting for Plugins.
  plugins: []
  // Setting for Plugins End.

})
