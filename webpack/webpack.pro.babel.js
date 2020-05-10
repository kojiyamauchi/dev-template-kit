/*
   Setting webpack for Production.
*/

import webpack from 'webpack'
import webpackMerge from 'webpack-merge'
import webpackBase from './webpack.base.babel'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import licenseInfoWebpackPlugin from 'license-info-webpack-plugin'

const generateRedirect =
  process.env['GITHUB_ACTIONS'] && process.env['ENDPOINT_REDIRECT']
    ? [
        new HtmlWebpackPlugin({
          filename: '404.html',
          title: '404, Launch Redirect.',
          meta: [{ viewport: 'width=device-width, initial-scale=1' }, { 'http-equiv': 'refresh', content: `0;URL=${process.env['ENDPOINT_REDIRECT']}` }]
        })
      ]
    : []

export default webpackMerge(webpackBase, {
  plugins: [
    // When Minify of Production's File, Keep License Comment Out.
    new licenseInfoWebpackPlugin({ glob: '{LICENSE,license,License}*' }),
    /* Even when it is already sufficiently compressed,
    the code can be analyzed in detail and the parts
    that are likely to be commonly compressed are compressed more positively */
    new webpack.optimize.AggressiveMergingPlugin(),
    // When Build & Deploy on GitHub Actions, Generate 404.html
    ...generateRedirect
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
