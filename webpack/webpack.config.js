const webpack = require('webpack')

module.exports = {
  entry: './base/core.js',
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
        test: /\.js|\.tag$/,
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
      // ES6 Compile.
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
      // ES6 Compile End.
    ]
  },
  resolve: {
    extensions: ['.js', '.tag']
  },
  plugins: [
    new webpack.ProvidePlugin({
      riot: 'riot'
    })
  ]
}
