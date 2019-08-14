const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const api = require('./api');
const upload = require('./upload')

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

module.exports = App.listen(3333, function(err) {
    if (err) {
        console.log(err)
        return
    }
    let uri = 'http://localhost:' + 3333;
    console.log('> Mini Server Listening at ' + uri + '\n');
});
