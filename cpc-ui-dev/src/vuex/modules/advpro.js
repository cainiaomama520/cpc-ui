/**
 * 用户模块
 */
import * as types from '../mutations.type';
import Cookie from '../../util/cookies';
import Api from '../api';
import {
    objectFilter,
    pubMessage
} from "../../util/common";

const state = {
    advcategory: [],
    advertiser: {},
    advertisers: [],
    product: {},
    products: []
};

const mutations = {
    [types.TYPE_ADVCATEGORY_LIST](state, category) {
        state.advcategory = category;
    },
    [types.TYPE_ADV](state, adv) {
        state.advertiser = adv;
    },
    [types.TYPE_ADV_LIST](state, advs) {
        state.advertisers = advs;
    },
    [types.TYPE_PRO_LIST](state, pros) {
        state.products = pros;
    },
    [types.TYPE_PRO](state, pro) {
        state.product = pro;
    }
};

const actions = {
    //请求广告主的分类列表
    async getAdvCategoryList({
        commit,
        dispatch
    }, option) {
        return Api.getList('dict-adver-industries-dropdown', option).then((data) => {
            commit(types.TYPE_ADVCATEGORY_LIST, data.body || []);
            return data.body || [];
        }, (error) => {
            dispatch('setMessage', {
                type: 'error',
                message: '获取广告主分类数据失败'
            });
            // console.log('advertisers. error.', error);
        })
    },

    async getAdvList({
        commit,
        dispatch
    }, option) {
        return Api.getList('advertisers', option).then((data) => {
            console.log('advertisers. success.', data);
            commit(types.TYPE_ADV_LIST, data.body || {})
            return data.body || {};
        }, (error) => {
            dispatch('setMessage', {
                type: 'error',
                message: '获取广告主列表数据失败'
            });
            return {};
            console.log('advertisers. error.', error);
        })
    },

    async createAdvertiser({
        commit,
        dispatch
    }, option) {
        return Api.save('advertisers', option).then((data) => {
            commit(types.TYPE_ADV, data.body || {});
            dispatch('setMessage', {
                type: 'success',
                message: '创建成功'
            });
            return data.body || {};
        }, (error) => {
            dispatch('setMessage', {
                type: 'error',
                message: '创建客户数据失败' + error
            });
            return {};
            console.log('advertisers. create error.', error);
        })
    },
	
	async getAdvDev({
        commit,
        dispatch
    }, option) {
        return Api.get('advertisers', option).then((data) => {
            console.log('advDev. success.', data);
            commit(types.TYPE_ADV, data.body || {})
            return data.body || {};
        }, (error) => {
            dispatch('setMessage', {
                type: 'error',
                message: '获取广告主详情数据失败'
            });
            return {};
            console.log('advertiser. error.', error);
        })
    },
	
    async updateAdvertiser({
        commit,
        dispatch
    }, option) {
        return Api.update('advertisers', option).then((data) => {
            commit(types.TYPE_ADV, data.body || {});
            dispatch('setMessage', {
                type: 'success',
                message: '客户信息更新成功'
            });
            return data.body || {};
        }, (error) => {
            dispatch('setMessage', {
                type: 'error',
                message: '服务器内部错误'
            });
            console.log('update advertisers error.', error);
            return {};
        });
    },

    async pushAdvertiserAudit({
        commit,
        dispatch
    }, option) {
        return Api.updatePath('advertisers-audit', option).then((data) => {
            commit(types.TYPE_ADV, data.body || {});
            dispatch('setMessage', {
                type: 'success',
                message: '推送成功'
            });
            return data.body || {};
        }, (error) => {
            console.log('error..');
            dispatch('setMessage', {
                type: 'warning',
                message: '服务器内部错误'
            });
            return {};
        })
    },

    async setAdvCache({
        commit,
        dispatch
    }, option) {
        commit(types.TYPE_ADV, option);
    },

    async setProCache({
        commit,
        dispatch
    }, option) {
        commit(types.TYPE_PRO, option);
    },

    async getProList({
        commit,
        dispatch
    }, option) {
        return Api.getList('products', option).then((data) => {
            console.log('products. success.', data);
            commit(types.TYPE_PRO_LIST, data.body || {})
            return data.body || {};
        }, (error) => {
            dispatch('setMessage', {
                type: 'error',
                message: '获取产品列表数据失败'
            });
            return {};
            console.log('products. error.', error);
        })
    },

    async getProDev({
        commit,
        dispatch
    }, option) {
        return Api.get('products', option).then((data) => {
            console.log('productDev. success.', data);
            commit(types.TYPE_PRO, data.body || {})
            return data.body || {};
        }, (error) => {
            dispatch('setMessage', {
                type: 'error',
                message: '获取产品详情数据失败'
            });
            return {};
            console.log('product. error.', error);
        })
    },

    async createProduct({
        commit,
        dispatch
    }, option) {
        return Api.save('products', option).then((data) => {
            commit(types.TYPE_PRO, data.body || {});
            dispatch('setMessage', {
                type: 'success',
                message: '创建成功'
            });
            return data.body || {};
        }, (error) => {
            dispatch('setMessage', {
                type: 'error',
                message: '创建产品数据失败' + error
            });
            return {};
            console.log('products. create error.', error);
        })
    },

    async updateProduct({
        commit,
        dispatch
    }, option) {
        return Api.update('products', option).then((data) => {
            commit(types.TYPE_PRO, data.body || {});
            dispatch('setMessage', {
                type: 'success',
                message: '产品信息更新成功'
            });
            return data.body || {};
        }, (error) => {
            dispatch('setMessage', {
                type: 'error',
                message: '服务器内部错误'
            });
            console.log('update advertisers error.', error);
            return {};
        });
    }
};


const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
};
