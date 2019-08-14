/**
 * api 接口层
 */

'use strict';

var http = require('http');
var config = require('../config');
var querystring = require('querystring');
var requestMp = require('request');
const waxfans = require('./waxfans');

module.exports = (req, res) => {
    let cookies = req.cookies;
    let authorization = cookies.token ? 'Bearer ' + cookies.token : '';
    let hostname = req.hostname;
    let headers = req.headers;
    let method = req.method;
    let url = req.originalUrl; //.substring(4);
    let body = req.body || {};
    let bodyString = JSON.stringify(body);
    let option = {
        hostname: config.api_host,
        port: config.api_port,
        path: url,
        method,
        headers: {
            connection: 'keep-alive',
            authorization: authorization,
            'user-agent': headers['user-agent'],
            'content-type': 'application/json',
            'accept-language': headers['accept-language']
        }
    };


    if (-1 != url.indexOf('waxfans')) {
        console.log('url.', url);
        if ('/api/waxfanslogin' == url) {
            return waxfans.LoginAdb(req, res);
        } else {
            return waxfans.getFansInfo(req, res);
        }
    } else if ('/api/authenticate' == url) {
        requestLogin(option, bodyString, function(code, result) {
            return res.json(code, result);
        });
    } else if ('/api/report/exportExcel' == url || '/api/fanslogin' == url) {
        requestFileExport(option, bodyString, (response) => {
            response.pipe(res);
        });
    } else {
        request(option, bodyString, function(code, result) {
            return res.json(code, result);
        });
    }
};

function requestFileExport(options, bodyString, callback) {
    let req = http.request(options, function(res) {
        callback(res);
    });

    if (['POST', 'PUT'].indexOf(options.method) !== -1) {
        req.write(bodyString + '\n');
    }

    req.on('error', function(e) {
        callback && callback(500, e);
    });

    req.end();
}

function requestLogin(options, bodyString, callback) {
    let req = http.request(options, function(res) {

        let authorization = res.headers.authorization || '';
        let auths = authorization.split(' ');
        if (auths.length >= 1) {
            callback(res.statusCode, {
                id_token: auths[1]
            })
        } else {
            callback(res.statusCode, {})
        }
    });

    if (['POST', 'PUT'].indexOf(options.method) !== -1) {
        req.write(bodyString + '\n');
    }

    req.on('error', function(e) {
        callback && callback(500, e);
    });

    req.end();
}

function request(options, bodyString, callback) {
    let req = http.request(options, function(res) {
        let buffers = [];
        res.on('data', function(chunk) {
            buffers.push(chunk);
        })
        res.on('end', function(error) {
            let result = {};
            if (error) {
                result = {
                    message: result
                };
            } else {
                let data = Buffer.concat(buffers).toString();
                try {
                    result = JSON.parse(data);

                } catch (e) {
                    result = {
                        message: data
                    };
                }
            }
            callback && callback(res.statusCode, result);
        });
    });

    if (['POST', 'PUT'].indexOf(options.method) !== -1) {
        req.write(bodyString + '\n');
    }

    req.on('error', function(e) {
        callback && callback(500, e);
    });

    req.end();
}
