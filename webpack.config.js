var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
  entry: path.resolve(__dirname, 'src/yunity'),
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'app.js',
    pathinfo: true
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loaders: ['json']
      },
      {
        test: /\.js?$/,
        include: [
          __dirname
        ],
        exclude: /(node_modules|bower_components)/,
        loaders: ['ng-annotate', 'babel']
      }, {
        test: /\.html$/,
        loaders: ['ngtemplate', 'html'],
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.png$/,
        loaders: ['file?name=assets/[hash].[ext]'],
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('app.css')
  ]
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }));
  config.plugins.push(new webpack.optimize.DedupePlugin());
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    mangle: true,
    compress: {
      warnings: false
    },
    output: {
      comments: false
    }
  }));
  config.module.loaders.push({
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract('style', 'css!sass'),
    exclude: /(node_modules|bower_components)/
  });
} else {
  //config.devtool = 'eval-source-map';
  config.module.loaders.push({
    test: /\.scss$/,
    loader: 'style!css!sass',
    exclude: /(node_modules|bower_components)/
  });
}

module.exports = config;
