var webpack = require('webpack');
var webpackConf = require('./webpack.config.build.js');

webpack(webpackConf, function(err, stats){
  if(err) throw err;
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
});
