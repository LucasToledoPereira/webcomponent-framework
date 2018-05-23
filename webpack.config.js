const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

module.exports = {
	entry:{
		main:	["./src/index.js"],
		vendor: ["@webcomponents/webcomponentsjs/webcomponents-loader", "@webcomponents/webcomponentsjs/custom-elements-es5-adapter"]
	},
  module: {
	rules: [
	  {
		test: /\.(js|jsx)$/,
		exclude: /node_modules/,
		use: {
		  loader: "babel-loader"
		}
	  },
	  {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
	  {
		test: /\.(scss|css)$/,
		use: [
			process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
			{loader:"css-loader", options: {sourceMap: true}},
			{loader: "sass-loader",	options: {sourceMap: true}}
		]
	},{
		test: /web-components\//,
		use:[{loader:"webcomponents-loader"}]
	}]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
};