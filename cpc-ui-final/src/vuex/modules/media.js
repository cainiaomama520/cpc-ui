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
	rtbmedias: [],
	rtbmedia: {},
	mediabuys: [],
	mediabuy: {}
};

const mutations = {
	[types.TYPE_RTBMEDIA_LIST](state, medias) {
		state.rtbmedias = medias;
	},
	[types.TYPE_MEDIABUY_LIST](state, mediabuys) {
		state.mediabuys = mediabuys;
	},
	[types.TYPE_MEDIABUY](state, mediabuy) {
		state.mediabuy = mediabuy;
	}
};

const actions = {
	//请求广告主的分类列表
	async getMediasList({
		commit,
		dispatch
	}, option) {
		return Api.getList('rtb-resources', option).then((data) => {
			commit(types.TYPE_RTBMEDIA_LIST, data.body || []);
			return data.body || [];
		}, (error) => {
			dispatch('setMessage', {
				type: 'error',
				message: '获取媒体数据失败'
			});
		})
	},

	async getMediabuyList({
		commit,
		dispatch
	}, option) {
		return Api.getList('media-buy-resources', option).then((data) => {
			commit(types.TYPE_MEDIABUY_LIST, data.body || {})
			return data.body || {};
		}, (error) => {
			dispatch('setMessage', {
				type: 'error',
				message: '获取Mediabuy媒体数据失败'
			});
			return {};
		})
	},

	async createMediabuy({
		commit,
		dispatch
	}, option) {
		return Api.save('media-buy-resources', option).then((data) => {
			commit(types.TYPE_MEDIABUY, data.body || {});
			dispatch('setMessage', {
				type: 'success',
				message: '创建成功'
			});
			return data.body || {};
		}, (error) => {
			dispatch('setMessage', {
				type: 'error',
				message: '创建媒体数据失败' + error
			});
			return {};
		})
	},

	async updateMediabuy({
		commit,
		dispatch
	}, option) {
		return Api.update('media-buy-resources', option).then((data) => {
			commit(types.TYPE_MEDIABUY, data.body || {});
			dispatch('setMessage', {
				type: 'success',
				message: '媒体信息更新成功'
			});
			return data.body || {};
		}, (error) => {
			dispatch('setMessage', {
				type: 'error',
				message: '服务器内部错误'
			});
			return {};
		});
	},

	async setMediabuyCache({
		commit,
		dispatch
	}, option) {
		commit(types.TYPE_MEDIABUY, option);
	},
};

const getters = {};

export default {
	state,
	mutations,
	actions,
	getters
};