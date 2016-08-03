require('babel-polyfill');
var production = process.env.NODE_ENV == 'production';
!production && require('babel-register');

var Model   = require('koapi').Model;
var config  = require('./config');
Model.init(config.database);
// 启动队列服务
require(production ? './build/daemons' : './src/daemons');
