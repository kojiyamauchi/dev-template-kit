/*
   Setting webpack for Production.
*/

// Import webpack.
import webpack from 'webpack'

// Import webpack Merge.
import webpackMerge from 'webpack-merge'

// Import Uglifyjs webpack Plugin.
import uglifyJSPlugin from 'uglifyjs-webpack-plugin'

// Import License Info webpack Plugin.
import licenseInfoWebpackPlugin from 'license-info-webpack-plugin'

// Import webpack Base.
import webpackBase from './webpack.base.babel'

// Using Base Setting for webpack.base.babel.js,
// If Using npm Script on '--mode production',
// Using of Below.
export default webpackMerge(webpackBase, {

  // Setting for Plugins.
  plugins: [
    // Minify of Production JS File & Keep License Comment Out.
    new licenseInfoWebpackPlugin({
      glob: '{LICENSE,license,License}*'
    }),
    /* Even when it is already sufficiently compressed,
    the code can be analyzed in detail and the parts
    that are likely to be commonly compressed are compressed more positively */
    new webpack.optimize.AggressiveMergingPlugin()
  ],
  // Advanced Setting for Plugins.
  optimization: {
    minimizer: [
      // For Uglifyjs webpack Plugin.
      new uglifyJSPlugin({
        uglifyOptions: {
          compress: {
            // Delete console.log(), Minify of JS File.
            drop_console: true
          },
          output: {
            // Keep Advanced License Comment Out.
            comments: /^\**!|@preserve|@license|@cc_on/
          }
        }
      })
    ]
  }
  // Setting for Plugins End.

})