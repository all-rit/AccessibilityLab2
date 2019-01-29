const path= require('path');
const fs = require('fs');
const webpack = require('webpack');
const dotenv = require('dotenv');

let HTMLWebpackPlugin = require('html-webpack-plugin');
let HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
    template: __dirname + '/public/index.html',
    filename: 'index.html',
    inject: 'body',
  });

module.exports = (env) => {
  const currentPath = path.join(__dirname);
  const basePath = currentPath + '/.env';
  const envPath = basePath + '.' + env.ENVIRONMENT;
  const finalPath = fs.existsSync(envPath) ? envPath: basePath;
  const fileEnv = dotenv.config({path: finalPath}).parsed;
  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});
  return{
    entry: {
      app: './src/index.js',
    },
    devServer: {
      compress: true,
      public: 'all.rit.edu'
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
        },
      ]
    },
    output: {
      filename: 'transformed.js',
      path: path.resolve(__dirname + '/build')
    },
    plugins: [HTMLWebpackPluginConfig, new webpack.DefinePlugin(envKeys)]
  };
};
