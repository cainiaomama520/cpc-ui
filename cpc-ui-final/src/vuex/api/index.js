/**
 * api接口处理
 */

import Vue from 'vue';

import VueResource from 'vue-resource';
import {
    objectFilter
} from "../../util/common";

Vue.use(VueResource);

Vue.http.options.crossOrigin = true;
// Vue.http.options.timeout = 3000;
Vue.http.options.root = '/api';
Vue.http.options.emulateJSON = false;

Vue.http.options.before = (req) => {
    let url = req.url;
    for (let key in req.params) {
        if (Array.isArray(req.params[key])) {//Array.isArray() 用于确定传递的值是否是一个 Array
            url += '?' + key + '=' + req.params[key].join('&' + key + '=');
            delete req.params[key];
        }
    }

    req.url = url;
};

// 登录
const login = (options) => Vue.http.post('authenticate', options);
const getUser = () => Vue.http.get('user', {});

const getList = (type, options, path) => {
    return Vue.http.get(getUrl(type, path), {
        params: options || {}
    });
};

const getSimple = (path, dispatch, options) => {
    return getList(path, objectFilter(options)).then(({
        data: d
    }) => d.data || {}).catch(e => dispatch("setMessage", {
        type: "error",
        message: e
    }));
};

const get = (type, id, path, options) => {
    return Vue.http.get(getUrl(type, id, path), {
        params: options || {}
    });
};

const save = (type, options, path) => {
    return Vue.http.post(getUrl(type, path), options);
};

const update = (type, options, path) => {
    return Vue.http.put(getUrl(type, path), options);
};

const updatePath = (type, options, path) => {
    return Vue.http.get(getUrl(type, path), {
        params: options || {}
    });
};



const remove = (type, option) => {
    let url,
        options;
    if (typeof option === 'string'|| typeof option === 'number') {
        url = getUrl(type, option);
    }else {
        url = getUrl(type);
        options = option || {};
    }
    return Vue.http.delete(url, {
        params: options
    });
};

function getUrl(...arg) {
    return arg.filter(item => !!item).join('/');//filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。即如果传过来多个参数，判断这个参数为不为空，并将不为空的元素用‘/’进行拼接。
};

export default {
    login,
    getUser,
    getList,
    getSimple,
    get,
    update,
    updatePath,
    remove,
    save
};
