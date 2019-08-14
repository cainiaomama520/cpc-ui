'use strict'

var OSS = require('ali-oss').Wrapper;
var config = require('../config');
var bucket = config.bucket;
var host = config.bucket_host;
var bucket_dir = config.bucket_dir;

var client = new OSS(bucket);
var multer = require('multer');
var upload = multer().single('file')
module.exports = function(req, res) {
    upload(req, res, function(err) {
        if (err) {
            return res.json(500, {
                code: 500,
                message: err
            });
        }
        let file = req.file;
        client.put(getFileName(), file.buffer, {
            headers: {
                "Content-Type": file.mimetype
            }
        }).then(result => {
            return res.json({
                code: 0,
                name: file.originalname,
                url: host + result.name
            });
        }).catch(err => {
            return res.json(500, {
                code: 500,
                message: 'upload file error: ' + err
            });
        });
    });
};

function getFileName() {
    return bucket_dir + uuid();
}

function uuid() {
    let s = [];
    let hexDigits = '0123456789abcdef';
    for (let i = 0; i < 32; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    let uuid = s.join('');
    return uuid;
}
