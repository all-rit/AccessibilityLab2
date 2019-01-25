const path= require('path');

let HTMLWebpackPlugin = require('html-webpack-plugin');
let HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
    template: __dirname + '/public/index.html',
    filename: 'index.html',
    inject: 'body'
  });

module.exports = {
  entry: {
    app: './src/index.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react', {
            'plugins': ['@babel/plugin-proposal-class-properties']}],
        }
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
      }
    ]
  },
  output: {
    filename: 'transformed.js',
    path: path.resolve(__dirname + '/build')
  },
  plugins: [HTMLWebpackPluginConfig]
};
