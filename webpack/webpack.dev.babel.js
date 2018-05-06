/*
   Setting webpack for Development.
*/

// Import webpack.
import webpack from 'webpack'

// Import webpack Merge.
import webpackMerge from 'webpack-merge'

// Import webpack Base.
import webpackBase from './webpack.base.babel'

// Using Base Setting for webpack.base.babel.js,
// If Using npm Script on '--mode development',
// Using of Below.
export default webpackMerge(webpackBase, {

  // Setting for Plugins.
  plugins: [],
  // Setting for Plugins End.

  // Created JS Source Maps.
  devtool: "inline-source-map",

  // Setting for 'webpack dev server'.
  devServer: {
    port: 3000, // Using Port webpack dev server.
    open: 'google chrome', // Using Default Browser.
    progress: true, // Displayed Progress of Conversion on Terminal.
    clientLogLevel: 'info', // Created Log Level.
    contentBase: __dirname + './../', // This API's Necessary When Using 'webpack dev server' for Root of index.html.
    watchOptions: {
      poll: true // Using When File Update is Not Detected Correctly.
    }
  }

})