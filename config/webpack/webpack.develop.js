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
    filename: '[name].bundle.js'
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin()
  ],
  resolve : {
    mainFields : ['main', 'browser']
  },
  externals: {
  },
  performance: {
    hints: false
  },
  devtool: 'cheap-module-source-map'
})
