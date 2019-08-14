/**
 * dev server
 */
const path = require('path');
const express = require('express');
const opn = require('opn');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const webpack = require('webpack');
const config = require('../config');
const api = require('./api');
const upload = require('./upload')

// const media = require('./industrys').industry;
const proxyMiddleware = require('http-proxy-middleware');

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

const webpackConfig = require('./webpack.dev.conf');

const port = process.env.PORT || config.dev.port;

// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable;
// let industryRouter=require("./Industry-classification").industryRouter;

const App = express();
App.use(bodyParser.json({
    limit: '10mb'
}));
App.use(bodyParser.urlencoded({
    limit: '10mb',
    extended: true
}));
App.use(cookieParser());
App.use('/api', api);
App.use('/upload', upload);

const compiler = webpack(webpackConfig);

var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
        colors: true,
        chunks: false
    },
    quiet: true
});

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: () => {}
});

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
        hotMiddleware.publish({
            action: 'reload'
        });
        cb();
    });
});

// proxy api requests
Object.keys(proxyTable).forEach(function(context) {
    var options = proxyTable[context]
    if (typeof options === 'string') {
        options = {
            target: options
        }
    }
    App.use(proxyMiddleware(options.filter || context, options))
});

// handle fallback for HTML5 history API
App.use(require('connect-history-api-fallback')());

// serve webpack bundle output
App.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
App.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
App.use(staticPath, express.static('./static'))



// devMiddleware.waitUntilValid(function() {
//     console.log('> Listening at ' + uri + '\n')
// })

module.exports = App.listen(port, function(err) {
    if (err) {
        console.log(err)
        return
    }
    let uri = 'http://localhost:' + port;
    console.log('> Listening at ' + uri + '\n');

    opn(uri);
});
