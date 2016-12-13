var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
module.exports =  {
	entry: { index: ['./build/dev_client.js', 'webpack/hot/only-dev-server', './src/index.js'] },
	output: {
		path: path.resolve(__dirname, '../dist'),
		// publicPath: '/dist',
		filename: '[name].js'
	},
  module: {
 		loaders: [
	 		{
      	test: /\.jsx?$/,
      	exclude: /node_modules/,
      	loaders: ['react-hot-loader', 'babel-loader?presets[]=react,presets[]=es2015'],
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
	    template: 'src/index.tmpl.ejs',
	    inject: true,
	    templateData: {
			isDev: true
		}
    }),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
  ]
}
