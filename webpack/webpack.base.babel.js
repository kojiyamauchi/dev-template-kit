/*
   Setting webpack for Base.
*/

import webpack from 'webpack'
import path from 'path'
// Type Check Plugin for TypeScript.
import ForkTsChecker from 'fork-ts-checker-webpack-plugin'
// Import Faster Build Plugin.
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin'
// Import Notify Desktop Plugin.
import WebpackBuildNotifierPlugin from 'webpack-build-notifier'

// Setting.
module.exports = {
  // Entry Point.
  entry: './base/core.tsx',
  // Output Point.
  output: {
    path: `${__dirname}/../`,
    filename: path.join('js', 'core.min.js')
    // publicPath: '/' // Setting Root of Top Dir. Unnecessary Maybe...
  },
  module: {
    rules: [
      // ES Lint.
      {
        enforce: 'pre',
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      // ECMA & React.
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          { loader: 'cache-loader' },
          { loader: 'thread-loader' },
          { loader: 'babel-loader?cacheDirectory' }
        ]
      },
      // TS & TSX.
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          { loader: 'cache-loader' },
          { loader: 'thread-loader' },
          { loader: 'babel-loader?cacheDirectory' },
          { loader: 'ts-loader', options: { happyPackMode: true }}
        ]
      },
      // Styled Components.
      {
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        use: [
          { loader: 'cache-loader' },
          { loader: 'thread-loader' },
          { loader: 'stylelint-custom-processor-loader', options: { emitWarning: true } }
        ]
      },
      // For Images.
      {
        test: /\.(jpg|png|gif)$/,
        loaders: 'url-loader',
        options: {
          limit: 10000,
          outputPath: 'materials/images'
        }
      },
      // For SVG.
      {
        test: /\.svg$/,
        use: [
          'babel-loader',
          {
            loader: 'react-svg-loader',
            options: {
              svgo: {
                plugins: [
                  {
                    removeTitle: true,
                    removeDesc: true
                  }
                ],
                floatPrecision: 2
              }
            }
          }
        ]
      },
      // For Inline SVG.
      {
        test: /\.inline.svg$/,
        loader: 'svg-inline-loader'
      },
      // For Icon.
      {
        test: /\.ico$/,
        loaders: 'url-loader',
        options: {
          limit: 10000,
          outputPath: 'materials/icons' // Setting Icons File Output Dir.
        }
      },
      // For Fonts.
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        loaders: 'url-loader',
        options: {
          limit: 10000,
          outputPath: 'materials/fonts' // Setting Fonts File Output Dir.
        }
      },
      // For PDF.
      {
        test: /\.pdf$/,
        loaders: 'url-loader',
        options: {
          limit: 10000,
          outputPath: 'materials/pdf' // Setting PDF File Output Dir.
        }
      },
      // For JSON (Into Bundle File).
      {
        type: 'javascript/auto',
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json-loader'
      },
      // Source Map.
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'source-map-loader'
      }
    ]
  },

  resolve: {
    extensions: [
      '.js',
      '.ts',
      '.jsx',
      '.tsx',
      '.json',
      '.svg',
      '.jpg',
      '.png',
      '.gif'
    ],

    alias: {
      '@': path.resolve(__dirname, './../apps'),
      'react-dom': '@hot-loader/react-dom'
    }
  },

  plugins: [
    // using 'happyPackMode' on ts-loader option. (transpileOnly is true)
    // for that, use this plugin.(for type check)
    new ForkTsChecker({ checkSyntacticErrors: true }),
    // For Faster Build.
    new HardSourceWebpackPlugin(),
    // Notify Desktop When a Compile Error.
    new WebpackBuildNotifierPlugin({ suppressSuccess: 'initial' })
  ],
  // Setting for Warning on Terminal.
  performance: {
    /* An entrypoint represents all assets that would be utilized during initial load time for a specific entry.
    This option controls when webpack should emit performance hints based on the maximum entrypoint size.
    The default value is 250000 (bytes). */
    maxEntrypointSize: 400000,

    /* An asset is any emitted file from webpack.
    This option controls when webpack emits a performance hint based on individual asset size.
    The default value is 250000 (bytes). */
    maxAssetSize: 400000
  }
}
