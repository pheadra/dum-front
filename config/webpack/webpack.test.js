'use strict'

module.exports = require('./webpack.base.js')({
  entry: { 'app': './app/main.js' },
  output: { },
  plugins: [ ],
  resolve : {
    mainFields : undefined
  },
  externals: {
    'cheerio': 'window',
    'react/addons': 'react',
    'react/lib/ExecutionEnvironment': 'react',
    'react/lib/ReactContext': 'react'
  },
  performance: {
    hints: false
  },
  devtool: 'cheap-module-source-map'
})
