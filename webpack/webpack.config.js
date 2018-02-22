const webpack = require('webpack')

module.exports = {
  entry: './base/core.ts',
  output: {
    path: __dirname + 'js/',
    filename: '_core.js'
  },
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
        }]
      },
      {
        test: /\.js|\.ts|\.tag$/,
        enforce: 'post',
        exclude: /node_modules/,
        use: [
        {
          loader: 'babel-loader',
          options: {
            presets: 'es2015-riot'
          }
        }]
      },
      // If Using Riot.js End.
      // ES6 & TypeScript Compile.
      {
        test: /\.js|\.ts$/,
        exclude: /node_modules/,
        loader: ['babel-loader','ts-loader']
      }
      // ES6 & TypeScript Compile End.
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.tag']
  },
  plugins: [
    new webpack.ProvidePlugin({
      riot: 'riot'
    })
  ]
}
