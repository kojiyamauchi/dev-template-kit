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
  devtool: 'inline-source-map',

  // Setting for 'webpack dev server'. -> Replace later for 'webpack serve'
  devServer: {
    port: 3000, // Setting Port of 'webpack dev server'.
    open: 'google chrome', // Setting Default Browser.
    progress: true, // Displayed Progress of Conversion on Terminal.
    clientLogLevel: 'info', // Created Log Level.
    contentBase: `${__dirname}/../`, // This API's Necessary When Using 'webpack dev server' on Root of index.html.
    //publicPath: '/', // Setting Root on 'webpack dev server'. Unnecessary Maybe...
    historyApiFallback: true, // When Using the HTML5 History API, The index.html Page Will Likely Have to be Served in Place of Any 404 Responses. Enable This by Passing.
    watchOptions: {
      poll: true // Using When File Update is Not Detected Correctly.
    }
  }
})
