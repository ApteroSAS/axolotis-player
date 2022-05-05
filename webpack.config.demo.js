const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  devtool: 'cheap-module-source-map',
  output: {
    globalObject: 'this',
    filename: "assets/js/[name]-[chunkhash].js",
    path: path.resolve(__dirname, "./dist/")
  },
  optimization: {
    minimize: false,
  },
  devServer: {
    open: true,
    hot: true,
    host: "localhost",
    port: 9080
  },
  module: {
    rules: [
      {
        test: /\.(m|j|t)s$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { sourceMap: true } },
        ],
      }
    ]
  },
  entry: {
    index: path.join(__dirname, "./src/demo/page/Index.ts"),
    basic: path.join(__dirname, "./src/demo/page/basic/Index.ts"),
    lazy: path.join(__dirname, "./src/demo/page/lazy/Index.ts"),
  },
  plugins: [
    new HTMLWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "./src/demo/page/index.html"),
      chunks: ["index"],
      chunksSortMode: "manual",
    }),
    new HTMLWebpackPlugin({
      filename: "basic/index.html",
      template: path.join(__dirname, "./src/demo/page/basic/index.html"),
      chunks: ["basic"],
      chunksSortMode: "manual"
    }),
    new HTMLWebpackPlugin({
      filename: "lazy/index.html",
      template: path.join(__dirname, "./src/demo/page/lazy/index.html"),
      chunks: ["lazy"],
      chunksSortMode: "manual"
    }),
    new CopyWebpackPlugin({
      patterns: [
        {from: "src/demo/assets/favicon.ico", to: "favicon.ico" }
      ]
    }),
    new CopyWebpackPlugin({
      patterns: [
        {from: "src/demo/assets/", to: "assets/" }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: 'css/index.css'
    })
  ],
  resolve: {
    alias: {
      three: path.resolve("./node_modules/three"),
      "@root": path.resolve("./src")
    },
    fallback: {
      'fs': false,
      'path': false, // ammo.js seems to also use path
    },
    extensions: ['.ts', '.js', '.json']
  }
};
