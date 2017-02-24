'use strict'
const webpack = require('webpack')
const path = require('path')

module.exports = require('./webpack.base.js')({
  entry: {
    'app': './app/main.js'
  },
  output: {
    path: path.resolve(process.cwd(), 'public'),
    publicPath: '/',
    filename: '[name].[hash].js'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true
      },
      output: {
        comments: false
      },
      sourceMap: true
    })
  ],
  resolve : {
    mainFields : ['main', 'browser']
  },
  performance: {
    hints: false
  },
  externals: {
  },
  devtool: 'source-map'
})
