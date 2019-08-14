/**
 * 首页模块
 */
import * as types from '../mutations.type';
import Cookie from '../../util/cookies';
import Api from '../api';
import {
    objectFilter,
    pubMessage
} from "../../util/common";

const state = {
    homeList: []
};

const mutations = {
    [types.TYPE_HOME_LIST](state, homeList) {
        state.homeList = homeList;
    }
};


const actions = {
    //请求首页展示列表
    async getHomeList({
        commit,
        dispatch
    }, option) {
        return Api.getList('report/dashboard', option).then((data) => {
            commit(types.TYPE_HOME_LIST, data.body || []);
            return data.body || [];
        }, (error) => {
            dispatch('setMessage', {
                type: 'error',
                message: '获取首页数据失败'
            });
            // console.log('advertisers. error.', error);
        })
    }
};


const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
};