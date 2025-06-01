// const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "development",

  devtool: "eval-source-map", //source maps for easier debugging
  devServer: {
    static: "./dist",
    open: true, // Opens browser on start
    hot: true, // Enables HMR (Hot Module Replacement)
    // liveReload: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        //SASS & CSS
        test: /\.s?css$/i,
        use: [
          "style-loader", //3. inject styles into DOM
          "css-loader", //2. turns CSS into CommonJS
          "sass-loader", //1. turns SASS into CSS
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/templates/template.html", // Source HTML file
    }),
  ],
});
