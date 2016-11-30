//webpack build!
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
module.exports =  {
	entry: {
		index: ['./src/index.js']
	},
	output: {
		path: path.resolve(__dirname, '../dist'),
		// publicPath: '/dist',//公共路径
		filename: '[name].js'
	},
  module: {
 		loaders: [
	 		{
      	test: /\.jsx?$/,
      	exclude: /node_modules/,
      	loaders: ['babel-loader?presets[]=react,presets[]=es2015'],
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
		new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      //这里的路径有点奇怪。。。
      filename: 'index.html',
      template: 'src/index.tmpl.html',
			inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
				//更多配置:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
		// split vendor js into its own file
		new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
		new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
		new webpack.optimize.OccurenceOrderPlugin()
  ]
}

//todo 可以做gzip优化
