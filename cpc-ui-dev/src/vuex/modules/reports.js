/**
 * 数据管理模块
 */
import * as types from '../mutations.type';
import Cookie from '../../util/cookies';
import Api from '../api';
import {
    objectFilter,
    pubMessage
} from "../../util/common";

const state = {
    reportAdmins: [],
    reportPeoples: [],
    advertisers: [],
    products: [],
    campaigns: [],
    adgroups: [],
    creatives: [],
    medias: [],
    adpositions: [],
    trackLink: []
};

const mutations = {
    [types.TYPE_REPORTADMIN_LIST](state, admins) {
        state.reportAdmins = admins; //运营所看列表
    },
    [types.TYPE_REPORPEOPLE_LIST](state, peoples) {
        state.reportPeoples = peoples; //受众分析
    },
    [types.TYPE_ADVDROPDOWN_LIST](state, advertisers) {
        state.advertisers = advertisers;
    },
    [types.TYPE_PRODROPDOWN_LIST](state, products) {
        state.products = products;
    },
    [types.TYPE_CAMPAIGN_LIST](state, campaigns) {
        state.campaigns = campaigns;
    },
    [types.TYPE_ADGROUP_LIST](state, adgroups) {
        state.adgroups = adgroups;
    },
    [types.TYPE_CREATIVE_LIST](state, creatives) {
        state.creatives = creatives;
    },
    [types.TYPE_MEDIA_LIST](state, medias) {
        state.medias = medias;
    },
    [types.TYPE_ADPOSITION_LIST](state, adpositions) {
        state.adpositions = adpositions;
    },
    [types.TYPE_TRACKTLINK_LIST](state, trackLink) {
        state.trackLink = trackLink; //搜索框链接标识
    }
};

const actions = {
    //请求搜索框广告主列表
    async getAdverList({
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
    //请求搜索框产品列表
    async getProductList({
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
    //请求搜索框广告活动列表
    async getCampaignList({
        commit,
        dispatch
    }, option) {
        return Api.getList('campaigns-dropdown', option).then((data) => {
            console.log('campaigns. success.', data);
            commit(types.TYPE_CAMPAIGN_LIST, data.body || {})
            return data.body || {};
        }, (error) => {
            dispatch('setMessage', {
                type: 'error',
                message: '获取活动列表数据失败'
            });
            return {};
            console.log('campaigns. error.', error);
        })
    },
    //请求搜索框广告组列表
    async getAdgroupList({
        commit,
        dispatch
    }, option) {
        return Api.getList('ad-groups-dropdown', option).then((data) => {
            console.log('ad-groups. success.', data);
            commit(types.TYPE_ADGROUP_LIST, data.body || {})
            return data.body || {};
        }, (error) => {
            dispatch('setMessage', {
                type: 'error',
                message: '获取广告组数据失败'
            });
            return {};
            console.log('ad-groups. error.', error);
        })
    },
    //请求搜索框创意列表
    async getCreativeList({
        commit,
        dispatch
    }, option) {
        return Api.getList('creatives-dropdown', option).then((data) => {
            console.log('creatives. success.', data);
            commit(types.TYPE_CREATIVE_LIST, data.body || {})
            return data.body || {};
        }, (error) => {
            dispatch('setMessage', {
                type: 'error',
                message: '获取广告创意数据失败'
            });
            return {};
            console.log('creatives. error.', error);
        })
    },
    //请求搜索框媒体列表
    async getMediaList({
        commit,
        dispatch
    }, option) {
        return Api.getList('common/dict-media', option).then((data) => {
            console.log('media. success.', data);
            commit(types.TYPE_MEDIA_LIST, data.body || {})
            return data.body || {};
        }, (error) => {
            dispatch('setMessage', {
                type: 'error',
                message: '获取媒体数据失败'
            });
            return {};
            console.log('media. error.', error);
        })
    },
    //请求搜索框广告位列表
    async getAdpositionList({
        commit,
        dispatch
    }, option) {
        return Api.getList('rtb-resources-dropdown', option).then((data) => {
            console.log('adposition. success.', data);
            commit(types.TYPE_ADPOSITION_LIST, data.body || {})
            return data.body || {};
        }, (error) => {
            dispatch('setMessage', {
                type: 'error',
                message: '获取广告位数据失败'
            });
            return {};
            console.log('adposition. error.', error);
        })
    },
    //请求搜索框链接标识列表
    async tracklinkList({
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
        })
    },
    //请求运营所看列表
    async getReportAdminList({
        commit,
        dispatch
    }, option) {
        return Api.save('report/doReport', option).then((data) => {
            commit(types.TYPE_REPORTADMIN_LIST, data.body || []);
            return data.body || [];
        }, (error) => {
            dispatch('setMessage', {
                type: 'error',
                message: '获取运营数据失败'
            });
        })
    },
    //下载
    async exportReportAdminList({
        commit,
        dispatch
    }, option) {
        return Api.save('report/exportExcel', option).then((data) => {
            return data;
        }, (error) => {
            dispatch('setMessage', {
                type: 'error',
                message: '下载数据失败'
            });
        })
    },
    //请求受众分析列表
    async getReportPeopleList({
        commit,
        dispatch
    }, option) {
        return Api.getList('', option).then((data) => {
            commit(types.TYPE_REPORPEOPLE_LIST, data.body || []);
            return data.body || [];
        }, (error) => {
            dispatch('setMessage', {
                type: 'error',
                message: '获取受众分析数据失败'
            });
        })
    }
}

const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
};
