var webpackConf = require('./webpack.conf.base.js');
var path = require('path');
var express = require('express');
var webpack = require('webpack');

//todo 写在conf上面
var port = 8088;


var app = express();
var compiler = webpack(webpackConf);

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: '/',//公共资源路径 cdn 那些 开发的时候暂时放这里
  stats: {
    colors: true,
    chunks: false
  }
});

//热加载 todo 什么实现原理？？
var hotMiddleware = require('webpack-hot-middleware')(compiler);

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
});

//前进后退
app.use(require('connect-history-api-fallback')());

app.use(devMiddleware);
app.use(hotMiddleware);


app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  var uri = 'http://localhost:' + port;
  console.log('Listening at ' + uri + '\n');
});
