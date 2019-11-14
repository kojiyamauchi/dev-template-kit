/*
   Setting webpack for Production.
*/

// Import webpack.
import webpack from 'webpack'

// Import webpack Merge.
import webpackMerge from 'webpack-merge'

// Import Terser webpack Plugin.
import TerserPlugin from 'terser-webpack-plugin'

// Import License Info webpack Plugin.
import LicenseInfoWebpackPlugin from 'license-info-webpack-plugin'

// Import webpack Base.
import webpackBase from './webpack.gulp.base.babel'

// Core Setting Below,
// Base Setting by webpack.gulp.base.babel.js.
export default webpackMerge(webpackBase, {
  mode: 'production',
  // Setting for Plugins.
  plugins: [
    // When Minify of Production's JS File, Keep License Comment Out.
    new LicenseInfoWebpackPlugin({
      glob: '{LICENSE,license,License}*'
    }),
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
