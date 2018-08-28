'use strict'
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')


const webpackConfig = merge(baseWebpackConfig, {
  entry: './src/index.js',
  devtool: false,
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: "vue-numeric-input.min.js",
    library: 'VueNumericInput',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], { root: path.resolve(__dirname , '..'), verbose: true }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      }
    })
  ],
  performance: {
    hints: false
  }
})
module.exports = webpackConfig
