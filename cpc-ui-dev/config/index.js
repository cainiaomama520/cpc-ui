// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
    api_host: process.env.API_URL || '192.168.3.117',
    api_port: process.env.API_PORT || 8080,
    // api_host: process.env.API_URL || '123.56.23.129',
    // api_port: process.env.API_PORT || 9898,
    // api_host: process.env.API_URL || 'api.gdtrafficad.com',
    // api_port: process.env.API_PORT || 80,

    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: './',
        productionSourceMap: true,
        port: process.env.PORT || 6061,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    },

    dev: {
        env: require('./dev.env'),
        port: process.env.PORT || 6061,
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            // '/api': {
            //     target: 'http://jsonplaceholder.typicode.com',
            //     changeOrigin: true,
            //     pathRewrite: {
            //         '/api': ''
            //     }
            // }
        },
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false
    },
    bucket: {
        region: 'oss-cn-beijing',
        accessKeyId: 'LTAIGxdrA6p2yz8N',
        accessKeySecret: 'eTgIKy10kNm4OIIWFkp5Xv14Rt8y1N',
        bucket: 'mexdsp'
    },
    bucket_dir: 'mexdsp/cpc/',
    bucket_host: 'http://res.ad-mex.com/'
}
