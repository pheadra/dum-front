/**
 * Created by pheadra on 9/18/16.
 */

'use strict'
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const autoprefixer = require('autoprefixer')
const precss = require('precss')
const postcssFocus = require('postcss-focus')
const postcssReporter = require('postcss-reporter')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const debug = require('debug')('app:webpack:config')
debug('Creating configuration.')


module.exports = (options) => ({
  entry: options.entry,
  output: options.output,
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader?sourceMap!postcss-loader' }) },
      { test: /\.(svg|woff|woff2|ttf|eot|otf)/, loaders :[
        {
          loader: 'file-loader',
          query: { name: 'public/fonts/[name].[ext]' }
        }]
      },
      {
        test: /\.(jpg|png|gif)$/,
        loaders: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: { progressive : true },
              gifsicle: { interlaced : false },
              optipng : { optimizationLevel: 4 },
              pngquant: { quality: '75-90', speed: 4 }
            }
          }

        ]
      },
      { test: /\.json$/, loader: 'json-loader' }
    ],
  },
  resolve: {
    modules: [__dirname + '/app', 'node_modules'],
    descriptionFiles: ['component.json', 'package.json', 'bower.json'],
    /* 테스트 시에는 mainFields가 있으면 오류가 남 */
    mainFields: options.resolve.mainFields,
    mainFiles: ['index'],
    aliasFields: ['browser'],
    extensions: ['.js', '.jsx']
  },
  plugins: options.plugins.concat([
    /* HMR시 업데이트 되는 파일 명을 알려주는 plugin*/
    new webpack.NamedModulesPlugin(),
    new ExtractTextPlugin('style.[hash].css'),
    new HtmlWebpackPlugin({
      title: 'Mango DSP - Advertiser Front',
      template: 'app/assets/index.html', // Load a custom template
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname,
        postcss: [
          autoprefixer({
            browsers: ['last 2 versions']
          }),
          postcssFocus(),
          postcssReporter({
            clearMessages: true
          }),
          precss({})
        ]
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]),
  performance: options.performance,
  externals:options.externals,
  devtool: options.devtool,
  target: 'web',
  stats: false
})
