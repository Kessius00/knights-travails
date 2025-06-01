const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map", //source maps for easier debugging

  output: {
    filename: "[name].[contenthash].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },

  module: {
    rules: [
      {
        //SASS & CSS
        test: /\.s?css$/i,
        use: [
          MiniCssExtractPlugin.loader, // Replaces 'style-loader'
          "css-loader", //2. turns CSS into CommonJS
          "sass-loader", //1. turns SASS into CSS
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      //simplifies creation of HTML files to serve webpack bundles, supplying a template
      template: "./src/templates/template.html",
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    new MiniCssExtractPlugin({
      //extracts CSS into separate files
      filename: "[name].[contenthash].css",
    }),
  ],
});
