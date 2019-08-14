'use strict';

const https = require('https');
const mQ = require('q');
const querystring = require('querystring');

var AdbCookies = {
    cookies: 'JsessionId=d2b0c32f-78e6-4b5d-be6a-c334c67adcf2',
    date: new Date().getTime()
}

const request = (options, send, callback) => {
    let data = [];
    let req = https.request(options, function(res) {
        res.on('data', function(d) {
            data.push(d);
        });
        res.on('end', function() {
            let resstr = Buffer.concat(data).toString();
            callback({
                data: resstr
            });
        });
    });

    if ('POST' == options.method) {
        req.end(JSON.stringify(send));
    } else {
        req.end();
    }

    req.on('error', function(e) {
        req.abort();
        return callback({
            error: e
        });
    });
}

class WaxFans {
    constructor() {}

    LoginAdb(req, res) {
        let update = false;
        if (AdbCookies.cookies) {
            if (new Date().getTime() - AdbCookies.date > 1 * 60 * 1000) {
                update = true;
            }
        } else {
            update = true;
        }

        if (update) {
            let data = querystring.stringify({
                "username": "north.liu@mobiexchanger.com",
                "password": "mex123456789"
            });

            let options = {
                host: 'www.adbright.cn',
                port: 443,
                path: '/login.do',
                method: "POST",
                headers: {
                    'Content-length': data.length,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }

            let sreq = https.request(options, (sres) => {
                if (sres.headers['set-cookie']) {
                    try {
                        let cookiesin = sres.headers['set-cookie'];
                        let tmp1 = cookiesin[1];
                        let cookiestmp = tmp1.split(';')[0];
                        AdbCookies.cookies = cookiestmp;
                        AdbCookies.date = new Date().getTime()
                        res.status(200).json({
                            code: 0,
                            message: 'okay'
                        });
                    } catch (e) {
                        res.status(200).json({
                            code: 999,
                            message: 'adbright login error.'
                        });
                    }
                } else {
                    res.status(200).json({
                        code: 0,
                        message: 'okay'
                    });
                }
            });
            sreq.write(data);
        } else {
            res.status(200).json({
                code: 0,
                message: 'okay'
            });
        }
    }

    async getFansInfo(req, res) {
        let query = req.query;
        console.log('query', query);

        let options = {
            host: 'www.adbright.cn',
            port: 443,
            path: '/deal/listAllWeibos.do?&key=' + encodeURIComponent(query.key),
            method: "GET",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json, text/plain, */*',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'zh-CN,zh,q=0.9,en,q=0.8',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
                'Host': 'www.adbright.cn',
                'Cookie': AdbCookies.cookies,
                'Referer': 'https://www.adbright.cn/delivery/order/create?id=1001633&oid=3061089&edit=1',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36'
            }
        }

        request(options, {}, (result) => {
            res.status(200).json(JSON.parse(result.data || '{}'));
        });
    }
}

module.exports = new WaxFans();
