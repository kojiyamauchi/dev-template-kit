/*
   Setting webpack for Development.
*/

import webpack from 'webpack'
import { merge } from 'webpack-merge'
import webpackBase from './webpack.base.babel'
import path from 'path'

export default merge(webpackBase, {
  plugins: [],
  devtool: 'inline-source-map',
  // For Webpack Dev Sever.
  devServer: {
    port: 3000, // Setting Port.
    open: 'google chrome canary', // Default Browser.
    progress: true, // Displayed Progress of Conversion on Terminal.
    clientLogLevel: 'info', // Created Log Level.
    contentBase: path.resolve(__dirname, '../delivery/'), // This API's Necessary When Using 'webpack dev server' on Root of index.html.
    // publicPath: '/', // Setting Root on 'webpack dev server'. Unnecessary Maybe...
    historyApiFallback: true, // When Using the HTML5 History API, The index.html Page Will Likely Have to be Served in Place of Any 404 Responses. Enable This by Passing.
    watchOptions: {
      poll: true // Using When File Update is Not Detected Correctly.
    }
  }
})
