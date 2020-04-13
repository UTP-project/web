const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      mui: path.resolve(__dirname, 'node_modules', '@material-ui/core/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    host: '0.0.0.0',
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://0.0.0.0:8000',
        pathRewrite: {'^/api' : ''},
        onProxyRes: function(proxyRes, req, res) {
          //Handling api server redirects
          if ([301, 302, 307, 308].indexOf(proxyRes.statusCode) > -1 && proxyRes.headers.location) {
              let redirect = proxyRes.headers.location;
              redirect = '/api' + redirect;
              proxyRes.headers.location = redirect;
          }
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
    }),
  ],
};
