/**
 * 辅助工具模块
 */
import * as types from '../mutations.type';
import Cookie from '../../util/cookies';
import Api from '../api';
import {
    objectFilter,
    pubMessage
} from "../../util/common";

const state = {
    assistLinks: [],
    advertisers: [],
    products: [],
    trackLinks: [],
    trackLink: {}
};

const mutations = {
    [types.TYPE_ASSISTLINK_LIST](state, assistLinks) {
        state.assistLinks = assistLinks;//监测链接列表
    },
    [types.TYPE_ADVDROPDOWN_LIST](state, advs) {
        state.advertisers = advs;//搜索框广告主
    },
    [types.TYPE_TRACKTLINK_LIST](state, trackLinks) {
        state.trackLinks = trackLinks;//搜索框链接标识
    },
    [types.TYPE_PRODROPDOWN_LIST](state, products) {
        state.products = products;//搜索框产品
    },
    [types.TYPE_TRACKTLINK](state, trackLink) {
        state.trackLink = trackLink;//创建新的链接标识
    }
};
const actions = {
	//请求搜索框广告主列表
	async getadverList({
        commit,
        dispatch
    }, option) {
        return Api.getList('advertisers-dropdown', option).then((data) => {
            console.log('advertisers. success.', data);
            commit(types.TYPE_ADVDROPDOWN_LIST, data.body || {})
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
	//请求搜索框链接标识列表
	async getTracklinkList({
        commit,
        dispatch
    }, option) {
        return Api.getList('track-links', option).then((data) => {
            console.log('track-links. success.', data);
            commit(types.TYPE_TRACKTLINK_LIST, data.body || {})
            return data.body || {};
        }, (error) => {
            dispatch('setMessage', {
                type: 'error',
                message: '获取链接标识列表数据失败'
            });
            return {};
            console.log('track-links. error.', error);
        })
    },
    async assistProList({
        commit,
        dispatch
    }, option) {
        return Api.getList('products-dropdown', option).then((data) => {
            console.log('products. success.', data);
            commit(types.TYPE_PRODROPDOWN_LIST, data.body || {})
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
	async getAssistlinkList({
        commit,
        dispatch
    }, option) {
        return Api.getList('track-links', option).then((data) => {
            commit(types.TYPE_ASSISTLINK_LIST, data.body || []);
            return data.body || [];
        }, (error) => {
            dispatch('setMessage', {
                type: 'error',
                message: '获取监测链接数据失败'
            });
        })
    },
    async setLinkCache({
        commit,
        dispatch
    }, option) {
        commit(types.TYPE_TRACKTLINK, option);
    },
    async getLinkDev({
        commit,
        dispatch
    }, option) {
        return Api.get('track-links', option).then((data) => {
            console.log('linkDev. success.', data);
            commit(types.TYPE_TRACKTLINK, data.body || {})
            return data.body || {};
        }, (error) => {
            dispatch('setMessage', {
                type: 'error',
                message: '获取链接标识详情数据失败'
            });
            return {};
            console.log('link. error.', error);
        })
    },

    async createLink({
        commit,
        dispatch
    }, option) {
        return Api.save('track-links', option).then((data) => {
            commit(types.TYPE_TRACKTLINK, data.body || {});
            dispatch('setMessage', {
                type: 'success',
                message: '创建链接标识成功'
            });
            return data.body || {};
        }, (error) => {
            dispatch('setMessage', {
                type: 'error',
                message: '创建链接标识数据失败' + error
            });
            return {};
            console.log('link. create error.', error);
        })
    },
    
    async updateLink({
        commit,
        dispatch
    }, option) {
        return Api.update('track-links', option).then((data) => {
            commit(types.TYPE_TRACKTLINK, data.body || {});
            dispatch('setMessage', {
                type: 'success',
                message: '链接标识信息更新成功'
            });
            return data.body || {};
        }, (error) => {
            dispatch('setMessage', {
                type: 'error',
                message: '服务器内部错误'
            });
            console.log('update link error.', error);
            return {};
        });
    }
}

const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
};