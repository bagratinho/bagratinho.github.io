var webpack = require('webpack');
var path = require('path');

var APP_DIR = path.resolve(__dirname, 'src/js');
var BUILD_DIR = path.resolve(__dirname, 'build');

var config = { 
  externals: {
    'cheerio': 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ], 
  stats: {
    colors: true,
    hash: true,
    version: true,
    timings: false,
    assets: false,
    chunks: false,
    modules: false,
    reasons: false,
    children: false,
    source: false,
    errors: false,
    errorDetails: false,
    warnings: false,
    publicPath: false
  },  
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },  
  module : {
    loaders : [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        query:
        {
            presets: ["react", "airbnb", "es2015", "stage-0"]
        }        
      }, 
      {        
        test: /\.less$/,
        loader: "style-loader!css-loader!less-loader"
      },     
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }, 
      {
        test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff'
      }, 
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      }, 
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  }
};

module.exports = config;
