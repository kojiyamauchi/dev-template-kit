/*
   Setting webpack for Base.
*/

// Import webpack.
import webpack from 'webpack'

// Import Node.js 'path' Modules. Using for Setting of Root Dir.
import path from 'path'

// Import Hard Source webpack Plugin.
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin'

// Setting Start.
module.exports = {
  // Setting webpack Mode.
  // If Using npm Script, This Code's CommentOut. Because, Mode Setting is Done by npm Script & package.json.
  // This Setting is Using gulp Only.
  mode: 'development',

  // JS Core File Entry Point.
  entry: './base/core.js', // If Using React & TypeScript.. => './base/core.tsx', Else If Using TypeScript Only.. => './base/core.ts'.

  // JS Core File Dist Point.
  output: {
    path: `${__dirname}/../`, // Setting of Output Target on Root Dir, When Using npm Script.
    //path: `${__dirname}/js/` <= If Using gulp, Use This Path. & Remove webpack.dev.babel.js & webpack.pro.babel.js
    filename: path.join('js', 'core.min.js') // Setting of Output Target Dir & Output File Name, When Using npm Script.
    //filename: 'core.js' <= If Using gulp, Use This Filename.
    //filename: '_core.js' <= If Using gulp & Concatenation of JS PlugIn Files.
    //publicPath: '/' // Setting Root of Top Dir. Unnecessary Maybe...
  },

  // Core Settings is Below.
  // Setting Rules According to JS Library and Framework.
  module: {
    rules: [
      // If Using Riot.js
      {
        test: /\.tag$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: [
          {
            loader: 'riot-tag-loader',
            options: {
              debug: true
            }
          }
        ]
      },
      {
        test: /\.(js|tag)$/,
        enforce: 'post',
        exclude: /node_modules/,
        loader: ['babel-loader']
      },
      // If Using Riot.js End.

      // ES6 & React & TypeScript.
      // If Don't Use TypeScript, Delete 'awesome-typescript-loader'.
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        loader: ['babel-loader']
      },
      // ES6 & React & TypeScript End.
      // Using Images. (Except SVG.)
      {
        test: /\.(jpg|png|gif)$/,
        loaders: 'url-loader',
        options: {
          limit: 10000,
          outputPath: 'materials/images' // Setting Images File Output Dir.
        }
      },
      // Using Images. (Except SVG.) End.
      // Using SVG.
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
      // Using SVG End.
      // Using Inline SVG.
      {
        test: /\.inline.svg$/,
        loader: 'svg-inline-loader'
      },
      // Using Inline SVG End.
      // Using Icons.
      {
        test: /\.ico$/,
        loaders: 'url-loader',
        options: {
          limit: 10000,
          outputPath: 'materials/icons' // Setting Icons File Output Dir.
        }
      },
      // Using Icons End.
      // Using Fonts.
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        loaders: 'url-loader',
        options: {
          limit: 10000,
          outputPath: 'materials/fonts' // Setting Fonts File Output Dir.
        }
      },
      // Using Fonts End.
      // Using PDF.
      {
        test: /\.pdf$/,
        loaders: 'url-loader',
        options: {
          limit: 10000,
          outputPath: 'materials/pdf' // Setting PDF File Output Dir.
        }
      },
      // Using PDF End.
      // Import Json File.
      {
        type: 'javascript/auto',
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json-loader'
      },
      // Import Json File End.

      // JS Sorce Map.
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'source-map-loader'
      }
      // JS Sorce Map End.
    ]
  },
  // Setting Rules According to JS Library and Framework End.

  // Setting for Import JS Modules.
  resolve: {
    // Setting for Cut the File Extension When Import JS Module.
    extensions: [
      '.js',
      '.ts',
      '.tag',
      '.tsx',
      '.json',
      '.svg',
      '.jpg',
      '.png',
      '.gif'
    ],

    // Setting for Project Root Dir, When Import JS Modules.
    alias: {
      '@': path.resolve(__dirname, './../apps') // When Creating with React.js
      //'@': path.resolve(__dirname, './..') // When Not Creating with React.js
    }
  },
  // Setting for Import JS Modules End.

  // Setting for Plugins.
  plugins: [
    new HardSourceWebpackPlugin() // Faster Build Plugins. Compile? Build? Which?
  ],
  // Setting for Plugins End.

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
