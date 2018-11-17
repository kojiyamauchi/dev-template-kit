/*
   Setting webpack for gulp.
*/

// Import webpack.
import webpack from 'webpack'

// Import Node.js 'path' Modules. Using for Setting of Root Dir.
import path from 'path'

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
    path: `${__dirname}/js/`, // <= If Using gulp, Use This Path. & Remove webpack.dev.babel.js & webpack.pro.babel.js
    filename: 'core.js' // <= If Using gulp, Use This Filename.
  },

  // Core Settings is Below.
  // Setting Rules According to JS Library and Framework.
  module: {
    rules: [
      // ES Lint.
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      // ES Lint End.
      // TS Lint.
      // Compare Editor Settings.
      {
        enforce: 'pre',
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'tslint-loader',
        options: {
          typeCheck: true,
          fix: true
        }
      },
      // TS Lint End.
      // ES2015.
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      // ES2015 End.
      // TypeScript.
      // Use Loader -> 'ts-loader' or 'awesome-typescript-loader'.
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: ['ts-loader', 'awesome-typescript-loader']
      },
      // TypeScript End.
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
    extensions: ['.js', '.ts', '.json'],

    // Setting for Project Root Dir, When Import JS Modules.
    alias: {
      '@': path.resolve(__dirname, './..')
    }
  },
  // Setting for Import JS Modules End.

  // Setting for Plugins.
  plugins: [],
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