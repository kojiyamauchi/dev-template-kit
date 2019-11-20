/*
   Setting webpack for Production.
*/

import webpack from 'webpack'
import webpackMerge from 'webpack-merge'
import webpackBase from './webpack.base.babel'
// For Minify Code.
import TerserPlugin from 'terser-webpack-plugin'
// For Keep Keep License Comment Out on Minify File.
import licenseInfoWebpackPlugin from 'license-info-webpack-plugin'

export default webpackMerge(webpackBase, {
  plugins: [
    // When Minify of Production's File, Keep License Comment Out.
    new licenseInfoWebpackPlugin({ glob: '{LICENSE,license,License}*' }),
    /* Even when it is already sufficiently compressed,
    the code can be analyzed in detail and the parts
    that are likely to be commonly compressed are compressed more positively */
    new webpack.optimize.AggressiveMergingPlugin()
  ],
  // Advanced Setting for Plugins.
  optimization: {
    // 'optimization.minimize' is true by default in production mode.
    minimizer: [
      // For Terser webpack Plugin.
      new TerserPlugin({
        terserOptions: {
          compress: {
            // Delete console.log(), When Minify of JS File.
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
})
