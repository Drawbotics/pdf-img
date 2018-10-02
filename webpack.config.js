const path = require('path');
const webpack = require('webpack');
const betterWebpackProgress = require('better-webpack-progress');
const StylishPlugin = require('webpack-stylish');


const DEV_MODE = process.env.NODE_ENV === 'development';


module.exports = {
  mode: process.env.NODE_ENV,
  devtool: DEV_MODE ? 'cheap-module-source-map' : 'source-map',
  stats: 'none',
  resolve: {
    extensions: [ '.js', '.jsx' ],
  },
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'PdfImg.js',
    sourceMapFilename: 'PdfImg.js.map',
    library: 'PdfImg',
    libraryTarget: 'umd',
  },
  externals: [
    'react',
    'react-dom',
    'pdf-dist',
  ],
  plugins: [
    new webpack.NamedModulesPlugin(),
    new StylishPlugin(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: process.env.NODE_ENV,
    }),
    new webpack.ProgressPlugin(betterWebpackProgress({
      mode: 'bar',
    })),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: [ path.resolve(__dirname, 'src') ],
        use: [ 'babel-loader' ],
      },
    ],
  },
};
