'use strict';

var express = require('express')
var config = require('../config')
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var api = require('./api');
var upload = require('./upload');
var port = process.env.PORT || config.build.port;

var app = express();

app.use(express.static(config.build.assetsRoot));
app.use(bodyParser.json({
    limit: '10mb'
}));
app.use(bodyParser.urlencoded({
    limit: '10mb',
    extended: true
}));
app.use(cookieParser())
app.get('/config.js', (req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/javascript"
    });
    return res.end(config.static);
});

app.use('/api', api);
app.use('/upload', upload);

app.get('/*', (req, res) => {
    return res.sendFile(path.join(__dirname, '../dist/index.html'));
});

module.exports = app.listen(port, function(err) {
    if (err) {
        console.log(err)
        return
    }
    console.log(new Date() + ' Listening prod at http://localhost:' + port + '\n')
});
