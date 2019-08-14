/**
 * api 接口层
 */

'use strict';

var http = require('http');
var config = require('../config');
var querystring = require('querystring');

var Api = require('./api');

const Local_Api = {
    login: (req, res) => {
        return res.status(200).json({
            code: 0,
            message: '',
            data: {
                name: 'IronMan',
                email: 'ironman@super.com',
                desc: '',
                user_id: 1,
                type: 'admin',
                secret: '1234567890'
            }
        });
    }
}

module.exports = (req, res) => {
    let url = req.originalUrl.substring(4);
    console.log('request.', url);
    if (/login/.test(url)) {
        Api(req, res);
        // return Local_Api.login(req, res);
    }
};
