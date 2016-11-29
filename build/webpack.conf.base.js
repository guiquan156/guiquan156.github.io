var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
module.exports =  {
	entry: { index: './src/index.js' },
	output: {
		path: path.resolve('../dist'),
		filename: '[name].js'
	},
  module: {
 		loaders: [
	 		{
      	test: /\.js$/,
      	exclude: /node_modules/,
      	loader: 'babel-loader',
				query: {
		      presets: ['react', 'es2015']
				}
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			},
			{
				test: /\.less$/,
				loader: 'style-loader!css-loader!postcss-loader!less-loader'
			}
		]
	},
	postcss: function() {
		return [
			require('autoprefixer'),
			require('cssnano')
		];
	},
  plugins: [
    new HtmlWebpackPlugin({
      //这里的路径有点奇怪。。。
      filename: 'index.html',
      template: 'src/index.tmpl.html',
      inject: true
    }),
		new webpack.HotModuleReplacementPlugin()
  ]
}
