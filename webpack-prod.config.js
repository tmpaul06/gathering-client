var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");

var definePlugin = new webpack.DefinePlugin({
  "process.env": {
    NODE_ENV: JSON.stringify("production")
  },
  "serverAddr": JSON.stringify("http://52.20.197.178/")
});

module.exports = {
  cache: false,
  devtool: "source-map",
  entry: {
    app: [
      path.join(__dirname, "src/index.js")
    ]
  },
  resolve: {
    // When requiring, you don"t need to add these extensions
    extensions: ["", ".js", ".jsx", ".json"],
    root: path.resolve(__dirname, "src"),
    modulesDirectories: [ "node_modules" ],
    fallback: path.join(__dirname, "node_modules"),
    alias: {
      "static": path.resolve(__dirname, "static")
    }
  },
  resolveLoader: {
    fallback: path.join(__dirname, "node_modules")
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/"
  },
  plugins: [
    new HtmlWebpackPlugin({
        inject: true,
        template: path.join(__dirname, "index.html"),
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          minifyJS: true
        }
    }),
    definePlugin,
    new webpack.optimize.UglifyJsPlugin({ compress: false })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    }, {
      test: /\.json$/,
      loaders: [ 'json' ]
    }, {
      test: /\.less$/,
      loader: 'style!css!less'
    }, 
    { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
    { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
    { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
    { test: /\.(png|jpg|jpeg|gif)?$/, loader: "file" },
    { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
    { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }]
  },
  eslint: {
    configFile: path.resolve(__dirname, "../src/.eslintrc")
  }
};